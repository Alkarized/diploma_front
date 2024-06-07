import {useState} from "react";
import * as React from "react";
import * as XLSX from "xlsx";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {sendExcelFields, sendExcelFile} from "../functionality/UpdateDataService";
import {notifyError, notifySuccess} from "../components/NotifyCenter";
import {User} from "../models/user";

const FileUploadSettings : React.FC<{ user: User, setter: any }> = ({user,setter}) => {
    const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
    const [typeError, setTypeError] = useState<string>("No file chosen");
    const [excelData, setExcelData] = useState<any>(null);
    const [headers, setHeaders] = useState([""]);

    const [article, setArticle] = useState("");
    const [code, setCode] = useState("");
    const [company, setCompany] = useState("");
    const [price, setPrice] = useState("");
    const [title, setTitle] = useState("");

    // onchange event
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let files = e.target.files;
        if (files && files.length > 0) {
            let selectedFile = files[0];

            if (fileTypes.includes(selectedFile.type)) {
                setTypeError("");
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    if (e.target != null) {
                        const result = e.target.result as ArrayBuffer
                        setExcelFile(result);
                        handleFileReload(result);
                    }
                }

            } else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
                setExcelData(null);
            }
        } else {
            setTypeError('Please select your file');
            setExcelFile(null);
            setExcelData(null);
        }
    }

    const getExcelData = (excelFileData : any) => {
        const workbook = XLSX.read(excelFileData, {type: 'buffer'});
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data : any = XLSX.utils.sheet_to_json(worksheet, { header: 1 , defval : "None"});
        console.log("data XLSX: ", data);
        return data;
    }

    const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (excelFile !== null) {
            const data = getExcelData(excelFile);
            const res = await sendExcelFile({'data': data});
            if (res) {
                notifySuccess("Данные успешно обнавлены!");
            } else {
                notifyError("Ошибка - смотрите логи");
            }
        }
    }

    const handleFileReload = (excelFileData : any) => {
        if (excelFileData !== null) {
            const data = getExcelData(excelFileData);
            setHeaders(data[0]);

            if (data[0].includes(user.settings.excel.article)){
                setArticle(user.settings.excel.article)
            } else {
                setArticle(``)
            }

            if (data[0].includes(user.settings.excel.code)){
                setCode(user.settings.excel.code)
            } else {
                setCode(``)
            }

            if (data[0].includes(user.settings.excel.company)){
                setCompany(user.settings.excel.company)
            } else {
                setCompany(``)
            }

            if (data[0].includes(user.settings.excel.price)){
                setPrice(user.settings.excel.price)
            } else {
                setPrice(``)
            }

            if (data[0].includes(user.settings.excel.title)){
                setTitle(user.settings.excel.title)
            } else {
                setTitle(``);
            }

            setExcelData(data);

        }
    }

    const handleSaveForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        user.settings.excel.article = article;
        user.settings.excel.price = price;
        user.settings.excel.company = company;
        user.settings.excel.code = code;
        user.settings.excel.title = title;

        console.log(user.settings.excel);

        const res = await sendExcelFields(user.settings.excel);
        if (res) {
            notifySuccess("Данные успешно обнавлены!");
            setter(user);
        } else {
            notifyError("Ошибка - смотрите логи");
        }

    }

    return (<div>
            <Typography>Настройка загрузки файла</Typography>
            <div className="wrapper">

                <h3>Загрузка и обновление полей</h3>

                <form className="form-group custom-form" onSubmit={handleFileSubmit}>
                    <input type="file" className="form-control" required onChange={handleFile}/>
                    <button type="submit" className="btn btn-success btn-md">Загрузить файл</button>
                    {/*<button type="button" onClick={handleFileReload} className="btn btn-success btn-md">Обновить поля</button>*/}

                </form>

                <div className="viewer">
                    {excelData ? (
                        <div className="table-responsive">
                            <form noValidate onSubmit={handleSaveForm}>
                                <FormControl sx={{ m: 1, minWidth: 50 }}>
                                    <InputLabel id="article-label">Артикул</InputLabel>
                                    <Select
                                        labelId="article-label"
                                        id="article-select"
                                        value={article}
                                        label="Артикул"
                                        defaultValue=""
                                        onChange={(e) => {
                                            if (e.target){
                                                setArticle(e.target.value)
                                            }
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {headers.map((header, index)=>(
                                            <MenuItem value={header} key={index}>
                                                {header}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Поле для Артикула</FormHelperText>
                                </FormControl>
                                <FormControl sx={{ m: 1, minWidth: 50 }}>
                                    <InputLabel id="code-label">Код</InputLabel>
                                    <Select
                                        labelId="code-label"
                                        id="code-select"
                                        value={code}
                                        label="Код"
                                        defaultValue=""
                                        onChange={(e) => {
                                            if (e.target){
                                                setCode(e.target.value)
                                            }
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {headers.map((header, index)=>(
                                            <MenuItem value={header} key={index}>
                                                {header}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Поле для кода</FormHelperText>
                                </FormControl>
                                <FormControl sx={{ m: 1, minWidth: 50 }}>
                                    <InputLabel id="company-label">Фирма</InputLabel>
                                    <Select
                                        labelId="company-label"
                                        id="company-select"
                                        value={company}
                                        label="Фирма"
                                        defaultValue=""
                                        onChange={(e) => {
                                            if (e.target){
                                                setCompany(e.target.value)
                                            }
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {headers.map((header, index)=>(
                                            <MenuItem value={header} key={index}>
                                                {header}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Поле для фирмы</FormHelperText>
                                </FormControl>
                                <FormControl sx={{ m: 1, minWidth: 50 }}>
                                    <InputLabel id="price-label">Цена</InputLabel>
                                    <Select
                                        labelId="price-label"
                                        id="price-select"
                                        value={price}
                                        label="Цена"
                                        defaultValue=""
                                        onChange={(e) => {
                                            if (e.target){
                                                setPrice(e.target.value)
                                            }
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {headers.map((header, index)=>(
                                            <MenuItem value={header} key={index}>
                                                {header}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Поле для цены</FormHelperText>
                                </FormControl>
                                <FormControl sx={{ m: 1, minWidth: 50 }}>
                                    <InputLabel id="title-label">Название</InputLabel>
                                    <Select
                                        labelId="title-label"
                                        id="title-select"
                                        value={title}
                                        label="Название"
                                        defaultValue=""
                                        onChange={(e) => {
                                            if (e.target){
                                                setTitle(e.target.value)
                                            }
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {headers.map((header, index)=>(
                                            <MenuItem value={header} key={index}>
                                                {header}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Поле для названия</FormHelperText>
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
                    ) : (
                        typeError && (
                            <div className="alert alert-danger" role="alert">{typeError}</div>
                        )
                    )}
                </div>

            </div>
        </div>
    );
}

export default FileUploadSettings;