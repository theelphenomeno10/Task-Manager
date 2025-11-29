import { useState, useEffect } from "react"
import { getTasks } from "../../services/taskApi"

function Home(){
    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        try {
            setLoading(true)
            const data = await getTasks()

            if (data && Array.isArray(data.formattedTasks)) {
                setTasks(data.formattedTasks) 
            } else{
                setTasks([])
            }
        } catch (err) {
            console.error(err)
            setTasks([])
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log("Running useEffect")
        fetchTasks()
    }, []
    )

    return (
    <>
    <h1 style={{textAlign: "center"}}>Task Manager</h1>
    <div>
        {
            loading ?
            (
                <p>Loading ...</p>
            ) : tasks.length === 0 ?
            (
                <p>No tasks found</p>
            ) : (
                <ul className="task">
                    {
                        tasks.map((task) => 
                        (
                            <li key={task._id}>{task.name} {task.expiry_day} {task.expiry_time}</li>
                        ))
                    }
                </ul>
            )
        }
    </div>
    </>
    )
}

export default Home