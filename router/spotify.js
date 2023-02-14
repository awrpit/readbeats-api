const router = require("express").Router()
const axios = require("axios")

router.post("/api/getsongs", (req, res) => {
  const accessToken = req.body.token
  const musicData = req.body.musicData
  const songsData = JSON.parse(musicData)

  async function getSongData(songName) {
    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: songName,
          type: "track",
          limit: 1,
        },
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })

      const track = response.data.tracks.items[0]
      return {
        name: track.name,
        artist: track.artists[0].name,
        cover_image: track.album.images[0].url,
        preview_url: track.preview_url,
        link: track.external_urls.spotify,
        trackUri: track.uri,
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function main() {
    const songsDetails = await Promise.all(
      songsData.map((song) => getSongData(song))
    )
    res.status(200).json({ output: songsDetails })
  }

  main()
})

module.exports = router
