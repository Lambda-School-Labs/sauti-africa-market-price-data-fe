import React, { useState } from 'react'
import axios from 'axios'

import Grid from '../Grid'
import { Button } from 'reactstrap'

import Highlight from 'react-highlight'
import 'highlight.js/styles/monokai-sublime.css'

const GridPage = ({ apiKey }) => {
  const [data, setData] = useState([])
  const [err, setErr] = useState(false)

  const apiCall = () => {
    setErr(false)
    setData([])
    axios
      .get(
        'https://sauti-africa-market-master.herokuapp.com/sauti/developer/filter/',
        {
          headers: {
            key: apiKey
          }
        }
      )
      .then(res => {
        setData(res.data.records)
      })
      .catch(e => {
        console.log({ apiCallErr: e })
        setErr(true)
        setData([])
      })
  }

  return (
    <div className="next-steps my-5">
      <div>
        {apiKey ? (
          <Button color="primary" onClick={apiCall}>
            Call the api
          </Button>
        ) : (
          'Request an API key from your Profile page to continue'
        )}
        {!data[0] ? (
          err ? (
            <div>You've reached the max amount of calls!</div>
          ) : apiKey ? (
            <div>Make a call!</div>
          ) : null
        ) : (
          data.map(entry => {
            return (
              <Highlight className="JSON">
                {JSON.stringify(entry, null, 2)}
              </Highlight>
            )
          })
        )}
      </div>
      <div>
        {apiKey ? (
          <div>
            <Grid apiKey={apiKey} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default GridPage