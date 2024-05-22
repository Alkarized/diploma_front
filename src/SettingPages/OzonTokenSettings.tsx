import * as React from "react";
import {User} from "../models/user";
import {useEffect, useState} from "react";
import {updateToken} from "../functionality/UpdateDataService";
import {notifyError, notifySuccess} from "../components/NotifyCenter";
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";

const OzonTokenSettings: React.FC<{ user: User, setter: any }> = ({user, setter}) => {
    const [token, setToken] = useState("");
    const [clientID, setClientID]: any = useState(0);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await updateToken("ozon", {"token": token, "id": clientID});
        if (res) {
            notifySuccess("Данные успешно обнавлены!");
            user.ozon.token = token;
            user.ozon.clientID = clientID;
            setter(user);
        } else {
            notifyError("Ошибка - смотрите логи");
        }
    };

    useEffect(() => {
        if (user && user.ozon) {
            setToken(user.ozon.token);
            setClientID(user.ozon.clientID);
        } else {
            setToken("");
            setClientID(0);
        }
    }, [user]);


    return (
        <div>
            <Typography>Настройка токенов для платформы VK</Typography>
            <form noValidate autoComplete="off" onSubmit={handleSave}>
                <FormControl fullWidth sx={{mt: 2}}>
                    <InputLabel htmlFor="token-id">Токен</InputLabel>
                    <Input
                        id="token-id"
                        value={token}
                        type="text"
                        onChange={(e) => {
                            if (/^.{0,255}$/.test(e.target.value)) {
                                setToken(e.target.value);
                            }

                        }}
                    />
                </FormControl>
                <FormControl fullWidth sx={{mt: 2}}>
                    <InputLabel htmlFor="client-id">Client ID</InputLabel>
                    <Input
                        id="client-id"
                        value={clientID}
                        onChange={(e) => {
                            if (/^\d{1,12}$/.test(e.target.value) && e.target.value !== '') {
                                setClientID(Number(e.target.value));
                            } else if (e.target.value === '') {
                                setClientID(0);
                            }
                        }}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Сохранить
                </Button>
            </form>
        </div>
    );
}

export default OzonTokenSettings;