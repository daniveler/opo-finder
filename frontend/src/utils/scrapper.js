import { load } from "cheerio"
import axios from "axios"

const getBopsData = async(url) => {

  let response

  try {
    response = await axios.get(url,
      {
        headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      }
    })
  }
  catch (e) {
    console.log(e.message)
  }

  // const $ = load(response.data)

  // const title = $(".headline")

  // console.log(title)

  // return { title }
  return
}

export default getBopsData