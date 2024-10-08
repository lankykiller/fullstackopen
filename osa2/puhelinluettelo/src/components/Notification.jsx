const Notification = ({ message }) => {
    console.log("ollaan notification")
    if (message === null) {
        console.log("message is null")
        return null
    }

    if (message.includes("Deleted")) {
        console.log("delete message")
        return (
            <div className="deleted">
                {message}
            </div>
        )
    } else if (message.includes("Information")) {
        return (
            <div className="deleted">
                {message}
            </div>
        )
    } else {
        return (
            <div className="added">
                {message}
            </div>
        )
    }
}

export default Notification