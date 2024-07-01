import axios from "axios";

async function axiosTest(){
    await axios
        .get("/test/updateMap")
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
        });
}

export {axiosTest}