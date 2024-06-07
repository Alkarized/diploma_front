import React, {useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, TextField, Typography} from '@mui/material';
import {User} from "../models/user";
import {sendExcelFile, updateTime} from "../functionality/UpdateDataService";
import {notifyError, notifySuccess} from "../components/NotifyCenter";

function timeConvertTo(num : number) : string{
    if (num >= 0 && num <= 9){
        return String("0" + num);
    } else {
        return String(num)
    }
}

function timeConvertFrom(num : string) : number {
    return Number(num);
}

function getStringTime(hours : number, minutes : number) : string{
    return String(timeConvertTo(hours) + ":" + timeConvertTo(minutes));
}

const TimeUpdateSettings: React.FC<{ user: User, setter: any }> = ({user, setter}) => {
    const [isTimeUpdateEnabled, setIsTimeUpdateEnabled] = useState(user.settings.timeEnable);
    const [time, setTime] = useState( getStringTime(user.settings.hours, user.settings.minutes));

    const handleCheckboxChange = (event: any) => {
        setIsTimeUpdateEnabled(event.target.checked);
    };

    const handleTimeChange = (event: any) => {
        setTime(event.target.value);
    };

    const saveData = async () => {
        let data = time.split(":");
        const res = await updateTime({'minutes': timeConvertFrom(data[1]), "hours":timeConvertFrom(data[0]),"enabled": isTimeUpdateEnabled});
        if (res) {
            notifySuccess("Данные успешно обнавлены!");
            user.settings.hours = timeConvertFrom(data[0])
            user.settings.minutes = timeConvertFrom(data[1]);
            user.settings.timeEnable = isTimeUpdateEnabled;
            setter(user);
        } else {
            notifyError("Ошибка - смотрите логи");
        }
    }

    return (
        <div>
            <Box>
                <Typography>Настройки обновления времени</Typography>
            </Box>
            <Box
                component="form"
                sx={{display: 'flex', flexDirection: 'column', gap: 1, margin: 'auto', mt: 4}}
            >

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isTimeUpdateEnabled}
                            onChange={handleCheckboxChange}
                            color="primary"
                        />
                    }
                    label="Включить обновление по времени"
                />
                <TextField
                    label="Время обновления"
                    type="time"
                    value={time}
                    style = {{width: 200}}
                    onChange={handleTimeChange}
                    disabled={!isTimeUpdateEnabled}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 минутные шаги
                    }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    onClick={saveData}
                >
                    Сохранить
                </Button>
            </Box>
        </div>
    );
}

export default TimeUpdateSettings;