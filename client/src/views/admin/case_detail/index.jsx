import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import TaskContext from 'contexts/TaskContext'

const CaseDetail = () => {
    const { id } = useParams()
    const { currentCase, getCase } = useContext(TaskContext);

    console.log(currentCase);

    useEffect(() => {
        getCase(id)
    }
    , [id])

    return (
        <div className='mt-8'>
            {
                currentCase ? (
                    <div>
                        <h1 className='text-2xl font-bold'>{currentCase["hunting-task"]}</h1>
                        <p>{currentCase.desc}</p>
                        <p>{currentCase.date}</p>
                        <p>Số subtask: {currentCase.subtasks.length}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default CaseDetail