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
    percentage : boolean
    markup : number
    token : string
    clientID : number
}

export type Settings = {
    blackList : string
    blackListItems : []
    checkOrders : string[]
    jobTime : any
    timeEnable :boolean
    avitoEnable : boolean
    ozonEnable : boolean
    vkEnable : boolean
    excel : Excel;
    failOnNoneFound : boolean
    hours : number
    minutes : number
    manyType : string

}

export type VK = {
    token : string
    clubID : number
    markup : number
    percentage : boolean
}

export type Avito = {
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