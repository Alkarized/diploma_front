import axios, {AxiosError} from "axios";
import {notifyError} from "../components/NotifyCenter";
import {parseError} from "./errorParser";
import api from "./api";
import {User} from "../models/user"
import {Log} from "../SettingPages/LogViewer";


function setStorage(data: any){
    const {type, accessToken, refreshToken} = data;
    localStorage.setItem('type', type)
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export async function login(formData : any) : Promise<boolean | AxiosError>{
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        setStorage(response.data);

        return true
    } catch (error) {
        return error as AxiosError;
    }
}

export async function register(formData : any) : Promise<boolean | AxiosError> {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/register', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        setStorage(response.data);
        return true;
    } catch (error) {
        notifyError(parseError(error as AxiosError));
        return error as AxiosError;
    }
}

export async function getUserData() : Promise<User | null> {
    try {
        const response = await api.get<User>('data/user');
        const data = response.data;

        console.log("data:", data);


        return {
            id: data.id,
            username: data.username,
            email: data.email,
            firstname: data.firstname,
            avito: {
                clientId: data.avito.clientId,
                clientSecret: data.avito.clientSecret,
                markup: data.avito.markup,
                percentage: Boolean(data.avito.percentage)
            },
            ozon: {
                markup: data.ozon.markup,
                percentage: Boolean(data.ozon.percentage),
                token : data.ozon.token,
                clientID : data.ozon.clientID
            },
            vk: {
                token: data.vk.token,
                clubID: data.vk.clubID,
                markup: data.vk.markup,
                percentage: Boolean(data.vk.percentage)
            }, settings: {
                blackList : data.settings.blackList,
                blackListItems : data.settings.blackListItems,
                checkOrders : data.settings.checkOrders,
                jobTime : data.settings.jobTime,
                timeEnable :data.settings.timeEnable,
                avitoEnable : data.settings.avitoEnable,
                ozonEnable : data.settings.ozonEnable,
                vkEnable : data.settings.vkEnable,
                excel : {
                    price : data.settings.excel.price,
                    code : data.settings.excel.code,
                    company : data.settings.excel.company,
                    article : data.settings.excel.article,
                    title : data.settings.excel.title
                },
                failOnNoneFound : data.settings.failOnNoneFound,
                hours : data.settings.hours,
                minutes : data.settings.minutes,
                manyType : data.settings.manyType
            }
        };
    } catch (error) {
        console.log("ErrorGetUserData");
        return null;
    }
}

export function checkIfLogged(){
    return !!(localStorage.getItem('token') && localStorage.getItem('refreshToken'));
}

export function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('refreshToken');
}


export async function getLogs() : Promise<Log[] | null> {
    try {
        const response = await api.get('data/logs/get');
        const data = response.data;
        let logs : Log[] = []
        const userLogList = response.data.userLogList;
        if (userLogList != null){
            for (let log of userLogList){
                logs.push({time:log.timestamp, text:log.message, type:log.type})
            }
        }

        return logs;

    } catch (error) {
        console.log("ErrorGetUserData");
        return null;
    }
}