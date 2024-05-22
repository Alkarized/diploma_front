export type Excel = {
    article : string;
    price : string;
    code : string;
    company : string;
    title : string;
}

export type Item = {
    id: string;
    primary: string;
    secondary: string;
};

export type Ozon = {
    id : number
    percentage : boolean
    markup : number
    token : string
    clientID : number
}

export type Settings = {
    blackList : string
    blackListItems : []
    checkOrders : []
    id : 1
    jobTime : any
    timeEnable :boolean
    avitoEnable : boolean
    ozonEnable : boolean
    vkEnable : boolean
    excel : Excel;
}

export type VK = {
    id : number
    token : string
    clubID : number
    markup : number
    percentage : boolean
}

export type Avito = {
    id : bigint
    clientId : string
    clientSecret : string
    markup : number
    percentage : boolean
}

export type User = {
    id: number;
    username: string;
    email: string;
    firstname: string;
    avito : Avito;
    ozon : Ozon;
    vk : VK;
    settings : Settings;

};