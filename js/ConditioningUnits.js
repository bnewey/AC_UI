import 'isomorphic-unfetch';

async function getCondUnitData(){
    const route = '/conditioningUnits/getCondUnitData';
    try{
        var data = await fetch(route,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if(!data.ok){
            throw new Error("getCondUnitData returned empty list or bad query")
        }
        var list = await data.json();
        return(list);
    }catch(error){
        throw error;
    }

}


module.exports = {
    getCondUnitData
};