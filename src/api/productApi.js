import clientAxios from "./clientAxios";

const productApi = {
    getShoseGenres: (params) => clientAxios.get("/IchibaGenre/Search/20140222", { params }),
    shoseFilter: (params) => clientAxios.get("/IchibaItem/Search/20170706", { params }),
}

export default productApi;