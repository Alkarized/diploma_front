import * as React from "react";
import {User} from "../models/user";
import {useEffect, useState} from "react";
import {updateToken} from "../functionality/UpdateDataService";
import {notifyError, notifySuccess} from "../components/NotifyCenter";
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";

const VKTokenSettings: React.FC<{ user: User, setter: any }> = ({user, setter}) => {
    const [token, setToken] = useState("");
    const [clubId, setClubID]: any = useState(0);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await updateToken("vk", {"token": token, "id": clubId});
        if (res) {
            notifySuccess("Данные успешно обнавлены!");
            user.vk.token = token;
            user.vk.clubID = clubId;
            setter(user);
        } else {
            notifyError("Ошибка - смотрите логи");
        }
    };

    useEffect(() => {
        if (user && user.vk) {
            setToken(user.vk.token);
            setClubID(user.vk.clubID);
        } else {
            setToken("");
            setClubID(0);
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
                    <InputLabel htmlFor="club-id">Club ID</InputLabel>
                    <Input
                        id="club-id"
                        value={clubId}
                        onChange={(e) => {
                            if (/^\d{1,12}$/.test(e.target.value)) {
                                setClubID(Number(e.target.value));
                            } else if (e.target.value === '') {
                                setClubID(0);
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

export default VKTokenSettings;