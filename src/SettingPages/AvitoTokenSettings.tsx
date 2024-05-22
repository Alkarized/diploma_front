import * as React from "react";
import {User} from "../models/user";
import {useEffect, useState} from "react";
import {updateAvitoSecret} from "../functionality/UpdateDataService";
import {notifyError, notifySuccess} from "../components/NotifyCenter";
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";

const AvitoTokenSettings: React.FC<{ user: User, setter: any }> = ({user, setter}) => {
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState('');
    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await updateAvitoSecret({"clientID": clientId, "clientSecret": clientSecret});
        if (res) {
            notifySuccess("Данные успешно обнавлены!");
            user.avito.clientId = clientId
            user.avito.clientSecret = clientSecret
            setter(user);
        } else {
            notifyError("Ошибка - смотрите логи");
        }
    };

    useEffect(() => {
        if (user && user.avito) {
            setClientId(user.avito.clientId);
            setClientSecret(user.avito.clientSecret);
        } else {
            setClientId("");
            setClientSecret("");
        }
    }, [user]);

    return (
        <div>
            <Typography>Настройка токенов для платформы.</Typography>
            <form noValidate autoComplete="off" onSubmit={handleSave}>
                <FormControl fullWidth sx={{mt: 2}}>
                    <InputLabel htmlFor="client-id">Client ID</InputLabel>
                    <Input
                        id="client-id"
                        value={clientId}
                        onChange={(e) => {
                            if (/^.{0,255}$/.test(e.target.value)) {
                                setClientId(e.target.value);
                            }
                        }}
                    />
                </FormControl>
                <FormControl fullWidth sx={{mt: 2}}>
                    <InputLabel htmlFor="client-secret">Client Secret</InputLabel>
                    <Input
                        id="client-secret"
                        type="text"
                        value={clientSecret}
                        onChange={(e) => {
                            if (/^.{0,255}$/.test(e.target.value)) {
                                setClientSecret(e.target.value)
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


export default AvitoTokenSettings;