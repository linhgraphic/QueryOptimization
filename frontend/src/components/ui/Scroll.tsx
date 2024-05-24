import ScrollBottom from "./ScrollBottom";
import ScrollTop from "./ScrollTop";

type ScrollProps = {
    onScollTop: () => void
    onScrollBottom: () => void
}

export default function Scroll({onScollTop, onScrollBottom}: ScrollProps) {
    return <div className = "flex flex-col justify-between h-32 fixed top-72 right-0">
            <ScrollTop onScrollTop = {onScollTop}/>
            <ScrollBottom onScrollBottom = {onScrollBottom}/>
        </div>
}