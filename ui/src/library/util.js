
function parseJSON(response) {
  return response.json()
}

function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(`HTTP Error: ${response.statusText}`)

  error.status = response.statusText
  error.response = response

  console.error(error)

  throw error
}

const Util = { parseJSON, checkHttpStatus }

module.exports = Util