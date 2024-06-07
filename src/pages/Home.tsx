import NotifyCenter, {notifySuccess} from "../components/NotifyCenter";
import * as React from "react";
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import "../style/style.css"
import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
    List,
    ListItemText,
    Paper,
    ListItemButton,

} from "@mui/material";
import {useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {logout} from "../functionality/AuthService";
import {blue} from '@mui/material/colors';
import AvitoTokenSettings from "../SettingPages/AvitoTokenSettings";
import PricePercent from "../SettingPages/PricePercent";
import VKTokenSettings from "../SettingPages/VKTokenSettings";
import OzonTokenSettings from "../SettingPages/OzonTokenSettings";
import BlackList from "../SettingPages/BlackList";
import FileUploadSettings from "../SettingPages/FileUploadSettings";
import ApiUploadSettings from "../SettingPages/ApiUploadSettings";
import EnabledServices from "../SettingPages/EnabledServices";
import DraggableList from "../components/DraggableList";
import TimeUpdateSettings from "../SettingPages/TimeUpdateSettings";
import LogViewer from "../SettingPages/LogViewer";

const theme = createTheme({
    palette: {
        primary: {
            light: blue[300],
            main: blue[500],
            dark: blue[700]
        },
    },
});

interface PlatformSetup {
    platform: string;
}

const FieldSettings: React.FC<PlatformSetup> = ({platform}) => {
    return (
        <div>
            <Typography>Настройка полей для {platform}</Typography>
            {/* Ваши компоненты настройки полей */}
        </div>
    );
}


type SettingOption = {
    label: string;
    component: React.ReactNode;
};

export default function Home() {
    function displayLogin(props: any) {
        if (!isDisplayed && props && 'appear' in props) {
            notifySuccess(props.appear);
            setDisplayed(true);
            window.history.replaceState({}, '')
        }
    }

    let location = useLocation();
    let navigate = useNavigate();

    const [isDisplayed, setDisplayed] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState<string>('');
    const [selectedSetting, setSelectedSetting] = useState<SettingOption | null>(null);
    const [userDetails, setUserDetails]: any = useOutletContext();

    const logoutFrom = () => {
        logout();
        navigate('/login', {state: {good: "Вы успешно вышли из системы!"}})
    }

    const handlePlatformChange = (platform: any) => {
        setSelectedPlatform(platform);
        setSelectedSetting(platformSettings[platform][0]);
    };

    const handleSettingChange = (setting: any) => {
        setSelectedSetting(setting);
    };


    React.useEffect(() => {
        displayLogin(location.state);
    });

    const platformSettings: { [key: string]: SettingOption[] } = {
        Avito: [
            {
                label: 'Настройка токенов',
                component: <AvitoTokenSettings user={userDetails} setter={setUserDetails}/>
            },
            {
                label: 'Настройка наценки',
                component: <PricePercent user={userDetails} setter={setUserDetails} platform="avito"/>
            },
        ],
        VK: [
            {
                label: 'Настройка токенов',
                component: <VKTokenSettings user={userDetails} setter={setUserDetails}/>
            },

            {
                label: 'Настройка наценки',
                component: <PricePercent user={userDetails} setter={setUserDetails} platform="vk"/>
            },
        ],
        OZON: [
            {
                label: 'Настройка токенов',
                component: <OzonTokenSettings user={userDetails} setter={setUserDetails}/>
            },
            {
                label: 'Настройка наценки',
                component: <PricePercent user={userDetails} setter={setUserDetails} platform="ozon"/>
            },
        ],
        settings: [
            {label: 'Порядок сопоставления', component: <DraggableList user={userDetails} setter={setUserDetails}/>},
            {label: 'Список исключений', component: <BlackList user={userDetails} setter={setUserDetails}/>},
            {label: 'Включенные сервисы', component: <EnabledServices user={userDetails} setter={setUserDetails}/>},
        ],
        upload: [
            {label: 'Загрузка файла', component: <FileUploadSettings user={userDetails} setter={setUserDetails}/>},
            {label: 'Загрузка через API', component: <ApiUploadSettings/>},
            {label: 'Обновление по времени', component: <TimeUpdateSettings user={userDetails} setter={setUserDetails}/>},
            {label: 'Логи', component: <LogViewer/>},
        ]
    };


    return (
        <>
            <NotifyCenter/>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Обновление ценников
                        </Typography>
                        <Button
                            disabled={!userDetails.settings.avitoEnable}
                            color={selectedPlatform === 'Avito' ? 'error' : 'inherit'}
                            variant={selectedPlatform === 'Avito' ? 'contained' : 'text'}
                            onClick={() => userDetails.settings.avitoEnable && handlePlatformChange('Avito')}
                        >
                            Avito
                        </Button>
                        <Button
                            disabled={!userDetails.settings.vkEnable}
                            color={selectedPlatform === 'VK' ? 'error' : 'inherit'}
                            variant={selectedPlatform === 'VK' ? 'contained' : 'text'}
                            onClick={() => userDetails.settings.vkEnable && handlePlatformChange('VK')}
                        >
                            VK
                        </Button>
                        <Button
                            disabled={!userDetails.settings.ozonEnable}
                            color={selectedPlatform === 'OZON' ? 'error' : 'inherit'}
                            variant={selectedPlatform === 'OZON' ? 'contained' : 'text'}
                            onClick={() => userDetails.settings.ozonEnable && handlePlatformChange('OZON')}
                        >
                            OZON
                        </Button>
                        <Button
                            color={selectedPlatform === 'settings' ? 'error' : 'inherit'}
                            variant={selectedPlatform === 'settings' ? 'contained' : 'text'}
                            onClick={() => handlePlatformChange('settings')}
                        >
                            Общие настройки
                        </Button>
                        <Button
                            color={selectedPlatform === 'upload' ? 'error' : 'inherit'}
                            variant={selectedPlatform === 'upload' ? 'contained' : 'text'}
                            onClick={() => handlePlatformChange('upload')}
                        >
                            Загрузка
                        </Button>
                        <Button color="inherit" variant="outlined" onClick={() => logoutFrom()}>Выход</Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    {selectedPlatform && (
                        <Box sx={{display: 'flex', mt: 4}}>
                            <List sx={{width: '30%'}}>
                                {platformSettings[selectedPlatform].map((option, index) => (
                                    <ListItemButton
                                        key={index}
                                        //selected={selectedSetting && option.label === selectedSetting.label}
                                        onClick={() => handleSettingChange(option)}
                                        sx={{
                                            bgcolor: (selectedSetting && option.label === selectedSetting.label) ? 'primary.main' : 'inherit',
                                            color: (selectedSetting && option.label === selectedSetting.label) ? 'primary.contrastText' : 'inherit'
                                        }}
                                    >
                                        <ListItemText primary={option.label}/>
                                    </ListItemButton>
                                ))}
                            </List>
                            <Paper sx={{width: '70%', p: 2, ml: 2}}>
                                {selectedSetting ? (
                                    <div>
                                        <Typography variant="h6">{selectedSetting['label']}</Typography>
                                        {selectedSetting['component']}
                                    </div>
                                ) : (
                                    <Typography variant="h6">Выберите настройку</Typography>
                                )}
                            </Paper>
                        </Box>
                    )}
                </Container>
            </ThemeProvider>
        </>

    );
}