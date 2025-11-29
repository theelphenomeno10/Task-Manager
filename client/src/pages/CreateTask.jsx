import { useState, useEffect } from "react"
import { getTasks, createTask } from "../../services/taskApi"

function Create(){
    const [loading, setLoading] = useState(true)
    const [newTask, setNewTask] = useState("")
    const [expireDate, setExpireDate] = useState("")

    const handleCreate = async (browserObj) => {
        browserObj.preventDefault()
        await createTask({})
    }

    return(
        <>
        <form>
            <form>
                <input></input>
            </form>
            <input></input>
            <button></button>
        </form>
        </>
    )
}

export default Create