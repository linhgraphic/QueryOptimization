package main

import (
	"database/sql"
	"net/http"

	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"

	"github.com/gin-contrib/cors"
)

const dbFileName = "assets.db"

func main() {
	db, err := sql.Open("sqlite3", dbFileName)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	router := gin.Default()
    config := cors.DefaultConfig()
    config.AllowAllOrigins = true
    config.AllowMethods = []string{"POST", "GET", "PUT", "OPTIONS"}
    config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"}
    config.ExposeHeaders = []string{"Content-Length"}
    config.AllowCredentials = true

	router.Use(cors.New(config))

	router.GET("/assets", func(c *gin.Context) {
		host := c.Query("host")
		limit := 50
		page := 1
		search := c.Query("search")

		if c.Query("limit") != "" {
			val, err := strconv.Atoi(c.Query("limit"))
			if err != nil {
				panic(err)
			}
			limit = val
		}

		if c.Query("page") != "" {
			val, err := strconv.Atoi(c.Query("page"))
			if err != nil {
				panic(err)
			}
			page = val

		}

		offset := page*limit - limit

		var rows *sql.Rows
		var stmt *sql.Stmt
		if host != "" {
			stmt, err = db.Prepare("SELECT id, host, comment, ip, owner FROM assets WHERE host LIKE ? LIMIT ? OFFSET ?")
			rows, err = stmt.Query("%"+host+"%", limit, offset)
		} else {
			stmt, err = db.Prepare("SELECT id, host, comment, ip, owner FROM assets WHERE owner LIKE ? LIMIT ? OFFSET ?")
			rows, err = stmt.Query("%"+search+"%", limit, offset)
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var assets []map[string]interface{}
		for rows.Next() {
			var id int
			var host, comment, ip, owner string
			if err := rows.Scan(&id, &host, &comment, &ip, &owner); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			assets = append(assets, map[string]interface{}{
				"id":      id,
				"host":    host,
				"comment": comment,
				"ip":      ip,
				"owner":   owner,
			})
		}

		c.JSON(http.StatusOK, assets)
	})

	router.GET("/assets/count", func(c *gin.Context) {
		var count int
		search := c.Query("search")

		err := db.QueryRow("SELECT COUNT(*) FROM assets WHERE owner LIKE ?", "%"+search+"%").Scan(&count)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"count": count})
	})

	router.Run(":8080")
}
