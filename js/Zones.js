import 'isomorphic-unfetch';

async function getZoneData(){
    const route = '/zones/getZoneData';
    try{
        var data = await fetch(route,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if(!data.ok){
            throw new Error("getZoneData returned empty list or bad query")
        }
        var list = await data.json();
        return(list);
    }catch(error){
        throw error;
    }

}



module.exports = {
    getZoneData: getZoneData,
};