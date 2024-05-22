import {Box, Button, FormControl, Typography} from "@mui/material";
import HtmlTooltip from "../components/HTMLTooltip";
import * as React from "react";
import TextareaAutosize from "../components/TextareaAutosize";
import {updateSettingsBlackList} from "../functionality/UpdateDataService";
import {notifyError, notifySuccess} from "../components/NotifyCenter";
import {useEffect, useState} from "react";
import {User} from "../models/user";

const BlackList: React.FC<{ user: User, setter: any }> = ({user,setter}) => {
    const [blackList, setBlackList] = useState("");

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await updateSettingsBlackList({'blackList': blackList});
        if (res) {
            notifySuccess("Данные успешно обнавлены!");
            user.settings.blackList = blackList;
            setter(user);
        } else {
            notifyError("Ошибка - смотрите логи");
        }
    }

    useEffect(() => {
        setBlackList(user.settings.blackList)
    }, [user]);

    return (
        <div>
            <Box>
                <Typography>Черный список полей:</Typography>
                <HtmlTooltip placement="bottom-end" leaveDelay={200}
                             title={
                                 <React.Fragment>
                                     <Typography color="inherit">Описание формирования списка</Typography>
                                     <p><em>{"Каждый элемент следует писать с новой строки"}</em></p>
                                     <p>{"Если нужен просто Артикул: пишется без ничего"}</p>
                                     <p>{"Если нужен Артикул и Фирма, то Фирма пишется в \"()\""}</p>
                                     <p>{"Если нужно по внутреннему коду, то код пишется в \"[]\""} </p>
                                     <p><b>{"Пример:"}</b></p>
                                     <p> {"Артикул"} <br/>
                                         {"[Внутренний код]"} <br/>
                                         {"Артикул (Фирма)"} </p>
                                 </React.Fragment>
                             }
                >
                    <Button>Наведитесь для подсказки</Button>
                </HtmlTooltip>
            </Box>
            <form noValidate autoComplete="off" onSubmit={handleSave}>
                <FormControl>
                    <TextareaAutosize value={blackList} aria-label="empty textarea" placeholder="Список исключений" minRows={2}
                                      maxRows={15} onChange={(e) => setBlackList(e.target.value)}/>
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

export default BlackList;