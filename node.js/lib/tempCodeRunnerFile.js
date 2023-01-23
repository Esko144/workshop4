const getLyrics=require("./getLyrics")
const getSong=require("./getSong")
const options={
    apiKey:'JK7sMpoaRWNA1rtx7mjynwQ48rM5LPi4FaKCCyBMhZ_PoOYrPFX2lH3pyQhShvAD',
    title:'baby',
    astist:'justin bieber',
    optimizeQUERY:true
}
getLyrics(options).then((lyrics)=>console.log(lyrics));
getSong(options).then((song)=>
    console.log(`
    ${song.lyrics}`)

)