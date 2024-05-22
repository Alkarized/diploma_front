import * as React from "react";
import {User} from "../models/user";
import {useEffect, useState} from "react";
import {updatePercentage} from "../functionality/UpdateDataService";
import {notifyError, notifySuccess} from "../components/NotifyCenter";
import {
    Button,
    FormControl,
    FormControlLabel,
    Input,
    InputAdornment,
    InputLabel,
    Switch,
    Typography
} from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";
import NumbersIcon from "@mui/icons-material/Numbers";

const PricePercent: React.FC<{ platform: "avito" | "vk" | "ozon", user: User, setter: any }> = ({
                                                                                                    platform,
                                                                                                    user,
                                                                                                    setter
                                                                                                }) => {
    const [percentage, setPercentage] = useState(false);
    const [markup, setMarkup] = useState(0.0);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await updatePercentage(platform, {"percentage": percentage, "markup": markup});
        if (res) {
            notifySuccess("Данные успешно обновлены!");
            user[platform].percentage = percentage;
            user[platform].markup = markup;
            setter(user);
        } else {
            notifyError("Ошибка - смотрите логи");
        }

    };

    useEffect(() => {
        setMarkup(user[platform].markup);
        setPercentage(user[platform].percentage);
    }, [platform, user]);

    return (
        <div>
            <Typography>Настройка наценки для {platform}</Typography>
            <form noValidate autoComplete="off" onSubmit={handleSave}>
                <FormControl fullWidth sx={{mt: 2}}>
                    <FormControlLabel
                        control={<Switch checked={percentage} onChange={(e) => setPercentage(e.target.checked)}/>}
                        label={!percentage ? "Прямая сумма" : "Процент"}/>
                </FormControl>
                <FormControl fullWidth sx={{mt: 2}}>
                    <InputLabel htmlFor="percentage">Наценка</InputLabel>
                    <Input
                        id="percentage"
                        type="number"
                        inputProps={{
                            step: "any"
                        }}
                        endAdornment={
                            <InputAdornment position="start">
                                {percentage ? <PercentIcon/> : <NumbersIcon/>}
                            </InputAdornment>
                        }
                        value={markup}
                        onChange={(e) => {
                            if (!isNaN(Number(e.target.value)) && e.target.value !== '') {
                                setMarkup(Number(e.target.value));
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

export default PricePercent;