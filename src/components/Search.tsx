import React, {useState, useCallback} from 'react';
import styles from '../styles/Search.module.scss';
import {Field, Form, Formik, FormikValues} from 'formik';
import searchIcon from '../img/icon/search.svg';
import searchIconWhite from '../img/icon/searchWhite.svg';
import {useSelector} from "react-redux";
import {RootStateType} from "../store/store";

type ISearch = {
    onSearchParamsChange: (params: FormikValues) => void;
};

const Search: React.FC<ISearch> = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const themeDark = useSelector((state: RootStateType) => state.theme.themeDark)
    const handleSearch = useCallback(
        (values: FormikValues) => {
            props.onSearchParamsChange(values);
        },
        [props]
    );

    const handleDebounce = useCallback(
        (value: string) => {
            const timeout = setTimeout(() => {
                handleSearch({q: value});
            }, 500);

            return () => clearTimeout(timeout);
        },
        [handleSearch]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        handleDebounce(value);
    };

    return (
        <Formik initialValues={{q: ''}} onSubmit={(values) => handleSearch(values)}>
            {() => (
                <Form className={styles.searchForm}>
                    <div className={styles.searchInputWrapper}>
                        <img src={themeDark ? searchIconWhite : searchIcon} alt="Search" className={styles.searchIcon}/>
                        <Field
                            type="text"
                            name="q"
                            className={`${styles.searchInput} ${themeDark ? styles.darkTheme : styles.lightTheme}`}
                            placeholder="Painting title"
                            value={searchValue}
                            onChange={handleChange}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Search;
