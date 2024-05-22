import {useEffect, useState} from "react";
import * as React from "react";
import {Button, FormControl, FormControlLabel, Switch} from "@mui/material";
import {User} from "../models/user";
import {updateSettingsEnable} from "../functionality/UpdateDataService";
import {notifyError, notifySuccess} from "../components/NotifyCenter";

const EnabledServices: React.FC<{ user: User, setter: any }> = ({user,setter}) => {
    const [avito, setAvito] = useState(false);
    const [vk, setVk] = useState(false);
    const [ozon, setOzon] = useState(false);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await updateSettingsEnable({'avitoEnable': avito, 'vkEnable': vk, 'ozonEnable': ozon});
        if (res) {
            notifySuccess("Данные успешно обнавлены!");
            user.settings.avitoEnable = avito;
            user.settings.vkEnable = vk;
            user.settings.ozonEnable = ozon;
            setter(user);
        } else {
            notifyError("Ошибка - смотрите логи");
        }
    }

    useEffect(() => {
        setAvito(user.settings.avitoEnable);
        setVk(user.settings.vkEnable);
        setOzon(user.settings.ozonEnable);
    }, [user]);


    return (
        <div>
            <form noValidate onSubmit={handleSave}>
                <FormControl fullWidth sx={{mt: 2}}>
                    <FormControlLabel
                        control={<Switch checked={avito} onChange={(e) => setAvito(e.target.checked)}/>}
                        label={avito ? "Обновление Авито включено" : "Обновление Авито выключено"}/>
                </FormControl>
                <FormControl fullWidth sx={{mt: 2}}>
                    <FormControlLabel
                        control={<Switch checked={vk} onChange={(e) => setVk(e.target.checked)}/>}
                        label={vk ? "Обновление ВК включено" : "Обновление ВК выключено"}/>
                </FormControl>
                <FormControl fullWidth sx={{mt: 2}}>
                    <FormControlLabel
                        control={<Switch checked={ozon} onChange={(e) => setOzon(e.target.checked)}/>}
                        label={ozon ? "Обновление Озон включено" : "Обновление Озон выключено"}/>
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

export default EnabledServices;