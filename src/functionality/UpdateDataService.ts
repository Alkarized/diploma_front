import api from "./api";

async function postUpdate(url : string, formData :any){
    try {
        await api.post(url, formData);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function updateAvitoSecret(formData : any) {
    return await postUpdate('data/avito/secret', formData);
}

export async function updatePercentage(platform : string, formData : any) {
    console.log("updated", formData);
    return await postUpdate('data/' + platform + '/percentage/update' , formData);
}

export async function updateToken(platform : string, formData : any) {
    console.log("updated", formData);
    return await postUpdate('data/' + platform + '/token/update' , formData);
}

export async function updateSettingsEnable(formData : any) {
    console.log("updated", formData);
    return await postUpdate('data/settings/enable/update', formData);
}

export async function updateSettingsBlackList(formData : any) {
    console.log("updated", formData);
    return await postUpdate('data/settings/blacklist/update', formData);
}

export async function sendExcelFile(formData : any) {
    console.log("updated", formData);
    return await postUpdate('price/excel', formData);
}

export async function sendExcelFields(formData : any) {
    console.log("updated", formData);
    return await postUpdate('data/settings/excel/update', formData);
}

export async function updateOrder(formData : any) {
    console.log("updated", formData);
    return await postUpdate('data/settings/orders/update', formData);
}

export async function updateTime(formData : any) {
    console.log("updated", formData);
    return await postUpdate('data/settings/time/update', formData);
}




