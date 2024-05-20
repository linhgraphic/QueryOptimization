package main

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

const dbFileName = "assets.db"

func main() {
	db, err := sql.Open("sqlite3", dbFileName)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	router := gin.Default()

	router.GET("/assets", func(c *gin.Context) {
		host := c.Query("host")
		var rows *sql.Rows
		if host != "" {
			rows, err = db.Query("SELECT id, host, comment, ip, owner FROM assets WHERE host LIKE ?", "%"+host+"%")
		} else {
			rows, err = db.Query("SELECT id, host, comment, ip, owner FROM assets")
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
		err := db.QueryRow("SELECT COUNT(*) FROM assets").Scan(&count)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"count": count})
	})

	router.Run(":8080")
}
