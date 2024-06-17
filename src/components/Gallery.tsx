import React, {useState} from 'react';
import Pagination from './Pagination';
import AdvancedSearch, {FormValueAdvancedSearch} from './AdvancedSearch';
import advanceSearchIconDark from '../img/icon/switchSearch.svg';
import advanceSearchIconWhite from '../img/icon/advenceSearchIconWhite.svg'
import styles from '../styles/Gallery.module.scss';
import PaintingCard from './PaintingCard';
import {useGetPaintingsQuery, useGetTotalCountQuery} from '../DAL/paintingsApi';
import Search from "./Search";
import {FormikValues} from "formik";
import {Painting} from "../utils/type";
import {useSelector} from "react-redux";
import {RootStateType} from "../store/store";

const Gallery: React.FC = () => {
    const themeDark = useSelector((state: RootStateType) => state.theme.themeDark)
    const [globalSearchToggle, setGlobalSearchToggle] = useState<boolean>(false);
    const [searchAdvancedParams, setSearchAdvancedParams] = useState<FormValueAdvancedSearch>({
        artist: '',
        location: '',
        yearFrom: '',
        yearTo: '',
    });
    const [searchPageParams, serSearchPageParams] = useState<FormikValues>({
        q: ''
    })
    const [currentPage, setCurrentPage] = useState<number>(1);

    const {data, isLoading} = useGetPaintingsQuery({
        _page: currentPage,
        _limit: 6,
        authorId: searchAdvancedParams.artist ? +searchAdvancedParams.artist : undefined,
        locationId: searchAdvancedParams.location ? +searchAdvancedParams.location : undefined,
        yearFrom: searchAdvancedParams.yearFrom ? +searchAdvancedParams.yearFrom : undefined,
        yearTo: searchAdvancedParams.yearTo ? +searchAdvancedParams.yearTo : undefined,
        q: searchPageParams.q
    });
    const {data: totalCount} = useGetTotalCountQuery({
        authorId: searchAdvancedParams.artist ? +searchAdvancedParams.artist : undefined,
        locationId: searchAdvancedParams.location ? +searchAdvancedParams.location : undefined,
        yearFrom: searchAdvancedParams.yearFrom ? +searchAdvancedParams.yearFrom : undefined,
        yearTo: searchAdvancedParams.yearTo ? +searchAdvancedParams.yearTo : undefined,
        q: searchPageParams.q
    })
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handelGlobalSearchToggle = () => {
        setGlobalSearchToggle(true);
    };

    const handleSearchParamsChange = (newParams: FormValueAdvancedSearch) => {
        setSearchAdvancedParams(newParams);
        setCurrentPage(1);
    };


    return (
        <div className={styles.gallery}>
            <div className={styles.searchBar}>
                <Search onSearchParamsChange={serSearchPageParams}/>
                {globalSearchToggle ? (
                    <AdvancedSearch
                        setGlobalSearchToggle={setGlobalSearchToggle}
                        onSearchParamsChange={handleSearchParamsChange}
                    />
                ) : (
                    <div onClick={() => handelGlobalSearchToggle()}>
                        <img alt={"Theme Toggle"} src={themeDark ? advanceSearchIconWhite : advanceSearchIconDark}/>
                    </div>
                )}
            </div>
            <div className={styles.paintingList}>
                {isLoading ? (
                    <div>Loading...</div>
                ) : data?.data.length === 0 ? (
                    <div className={styles.paintingList__searchUnsuccess}>
                        <h4>No matches for <b>{searchPageParams.q}</b></h4>
                        <p>Please try again with a different spelling or keywords.</p>
                    </div>
                ) : (
                    data?.data.map((painting: Painting) => (
                        <PaintingCard key={painting.id} painting={painting}/>
                    ))
                )}
            </div>
            {totalCount?.total !== undefined && (
                <Pagination
                    total={totalCount.total}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default Gallery;
