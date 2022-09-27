import React, {useState} from "react";
import axios from 'axios';
import Loading from 'components/loading';

import { Repositories } from 'types';
import { FaSearch, FaLink, FaPlus } from "react-icons/fa";

import 'styles/search.scss';

const SearchForm = () => {
    const [searchText, setSearchText] = useState<string | ''>('');
    const [repos, setRepos] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const viewIssueArr : string[] = JSON.parse(localStorage.getItem('viewIssue') || '[]');

    const SearchRepos = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchRepos();
        window.scrollTo(0, 0);
    };

    const fetchRepos = () => {
        setLoading(true);

        axios.get(`https://api.github.com/search/repositories?q=${searchText}&sort=updated`)
            .then((res) => {
                setRepos(res.data.items);
            }).catch((error) => {
                console.log(error);
            }).then(() => setLoading(false));
    };

    const addRepo = (url : string) => {
        if(viewIssueArr.length >= 4) {
            alert('등록 개수는 최대 4개로 제한');
            return false;
        }

        viewIssueArr.push(url);
        localStorage.setItem('viewIssue', JSON.stringify(viewIssueArr));

        alert('추가 완료');
    };

    const ViewRepos = () : JSX.Element => {
        return (
            <ul className="repo">
                {
                    repos.map((val : Repositories, idx: number) => {
                        const update = new Intl.DateTimeFormat('ko').format(new Date(val.updated_at)).slice(0, -1);
                        return (
                            <li className="repo__item" key={idx}>
                                <div className="inner__text">
                                    <h3>{val.name}</h3>
                                    <p>{val.description}</p>
                                    <p>updated_at {update}</p>
                                </div>
                                <div className="inner__status">
                                    {val.open_issues !== 0 && <p>issues : {val.open_issues}</p>}
                                    <button onClick={() => addRepo(val.url)}><FaPlus /></button>
                                    <a href={val.html_url} target="_blank" rel="noreferrer"><FaLink /></a>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    return (
        <>
            { loading && <Loading /> }

            <div className="search">
                <form onSubmit={SearchRepos} >
                    <label htmlFor="searchText">
                        <input
                            id="searchText"
                            type="text"
                            placeholder="레포지토리 이름으로 검색"
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                        />
                    </label>
                    <button><FaSearch /></button>
                </form>
                {repos.length !== 0 && <ViewRepos />}
            </div>
        </>
    );
}

export default SearchForm;