const url_v1 = import.meta.env.VITE_API_URL_V1
console.log("URL:", import.meta.env.VITE_API_URL_V1)

export const getTasks = async () => {
    const res = await fetch(`${url_v1}/tasks`)
    if (!res.ok){
        throw new Error("Failed to fetch tasks" )
    }

    return res.json()
}

export const createTask = async (task) => {
    const res = await fetch(`${url_v1}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })

    if (!res.ok){
        throw new Error("Failed to create task")
    }

    
    return res.json();
}

export const getTask = async (id) => {
    const res = await fetch(`${url_v1}/tasks/${id}`)
    if (!res.ok){
        throw new Error(`Failed to get task ${id}`)
    }

    return res.json()
}

export const deleteTask = async (id) => {
    const res = await fetch(`${url_v1}/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })

    if (!res.ok) {
        throw new Error(`Failed to delete task ${id}`);
    }

    return res.json()
}

export const updateTask = async (id, updatedTask) => {
    const res = await fetch(`${url_v1}/tasks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(updatedTask)
    })

    if (!res.ok){
        throw new Error("Failed to update task")
    }

    return res.json()
}
