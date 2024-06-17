import React, {useState} from 'react';
import {Field, Form, Formik} from 'formik';
import styles from '../styles/AdvancedSearch.module.scss';
import closeIcon from '../img/icon/iconClose.svg';
import closeIconWhite from '../img/icon/closeSearchWhite.svg'
import plusIcon from '../img/icon/plusIcon.svg';
import minusIcon from '../img/icon/minusIcon.svg';
import {useGetAuthorsQuery} from "../DAL/authorsApi";
import {useGetLocationsQuery} from "../DAL/locationsApi";
import {useSelector} from "react-redux";
import {RootStateType} from "../store/store";

type IAdvancedSearch = {
    setGlobalSearchToggle: (params: boolean) => void;
    onSearchParamsChange: (params: FormValueAdvancedSearch) => void;
};
export type FormValueAdvancedSearch = {
    artist: string;
    location: string;
    yearFrom: string;
    yearTo: string;
}

const AdvancedSearch: React.FC<IAdvancedSearch> = (props) => {
    const themeDark = useSelector((state: RootStateType) => state.theme.themeDark)
    const [showArtistFilter, setShowArtistFilter] = useState(false);
    const [showLocationFilter, setShowLocationFilter] = useState(false);
    const [showYearFilter, setShowYearFilter] = useState(false);
    const {data: authors} = useGetAuthorsQuery()
    const {data: locations} = useGetLocationsQuery()

    const handleCloseSearch = () => {
        props.setGlobalSearchToggle(false);
    };
    const themeFn = () => {
        return `${themeDark ? styles.darkTheme : styles.lightTheme}`
    }

    const handleToggleFilter = (filter: 'artist' | 'location' | 'year') => {
        switch (filter) {
            case 'artist':
                setShowArtistFilter(!showArtistFilter);
                break;
            case 'location':
                setShowLocationFilter(!showLocationFilter);
                break;
            case 'year':
                setShowYearFilter(!showYearFilter);
                break;
        }
    };
    const handleSubmit = (values: FormValueAdvancedSearch) => {
        props.onSearchParamsChange(values);
        props.setGlobalSearchToggle(false);
    };
    return (
        <div className={`${styles.advancedSearch} ${themeDark ? styles.darkTheme : styles.lightTheme}`}>
            <div className={styles.closeSearch}>
                <img src={themeDark? closeIconWhite : closeIcon} onClick={handleCloseSearch} alt="Close" />
            </div>
            <Formik
                initialValues={{
                    artist: '',
                    location: '',
                    yearFrom: '',
                    yearTo: '',
                }}
                onSubmit={(values: FormValueAdvancedSearch) => {
                    handleSubmit(values)
                }}
            >
                {() => (
                    <Form>
                        <div className={styles.filterGroup}>
                            <label htmlFor="artist" className={styles.filterLabel}>
                                <div>Artist</div>
                                <div>
                                    <img
                                        src={showArtistFilter ? minusIcon :  plusIcon}
                                        onClick={() => handleToggleFilter('artist')}
                                        className={styles.filterToggle}
                                        alt={showArtistFilter ? 'Collapse' : 'Expand'}
                                    />
                                </div>
                            </label>
                            {showArtistFilter && (
                                <Field
                                    id="artist"
                                    name="artist"
                                    className={`${styles.filterSelect} ${themeFn()}`}
                                    as="select"
                                >
                                    <option value="">Select the artist</option>
                                    {authors?.map((author) => (
                                        <option key={author.id} value={author.id}>
                                            {author.name}
                                        </option>
                                    ))}
                                </Field>
                            )}
                        </div>
                        <div className={styles.filterGroup}>
                            <label htmlFor="location" className={styles.filterLabel}>
                                <div>Location</div>
                                <div>
                                    <img
                                        src={showLocationFilter ? minusIcon : plusIcon}
                                        onClick={() => handleToggleFilter('location')}
                                        className={styles.filterToggle}
                                        alt={showLocationFilter ? 'Collapse' : 'Expand'}
                                    />
                                </div>
                            </label>
                            {showLocationFilter && (
                                <Field
                                    id="location"
                                    name="location"
                                    className={`${styles.filterSelect} ${themeFn()}`}
                                    as="select"
                                >
                                    <option value="">Select the location</option>
                                    {
                                        locations?.map((location) => (
                                            <option key={location.id} value={location.id}>
                                                {location.location}
                                            </option>
                                        ))
                                    }
                                </Field>
                            )}
                        </div>
                        <div className={styles.filterGroup}>
                            <label htmlFor="yearFrom" className={styles.filterLabel}>
                                <div>Year</div>
                                <div>
                                    <img
                                        src={showYearFilter ? minusIcon : plusIcon}
                                        onClick={() => handleToggleFilter('year')}
                                        className={styles.filterToggle}
                                        alt={showYearFilter ? 'Collapse' : 'Expand'}
                                    />
                                </div>
                            </label>
                            {showYearFilter && (
                                <div className={`${styles.dateRangeInput} ${themeFn()}`}>
                                    <Field
                                        id="yearFrom"
                                        name="yearFrom"
                                        className={`${styles.filterInput} ${themeDark ? styles.darkTheme : styles.lightTheme}`}
                                        type="text"
                                        placeholder="From"
                                    />
                                    <div className={styles.dateRangeSeparator}>-</div>
                                    <Field
                                        id="yearTo"
                                        name="yearTo"
                                        className={`${styles.filterInput} ${themeFn()}`}
                                        type="text"
                                        placeholder="To"
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.buttonDiv}>
                            <button type="submit" className={`${styles.buttonDivSearch} ${themeFn()}`}>
                                Show the result
                            </button>
                            <button type="reset" className={styles.buttonDivReset}>
                                Clear
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AdvancedSearch;
