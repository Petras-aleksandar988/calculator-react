import React from 'react'

export default function Operation({dispatch, operation}) {
  return (
      <button onClick={()=>dispatch({type: "operation", payload :{operation}})} >{operation }</button>
  )
}
