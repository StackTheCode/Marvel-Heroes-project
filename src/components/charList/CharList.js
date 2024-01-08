import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMesage from '../errorMessage/ErrorMessage';
import React from 'react';
import { useState, useEffect, useRef } from 'react';

const CharList = (props) => {

    const [charlist, setCharlist] = useState([]);
    const [loadNewItem, setNewItem] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharended] = useState(false)



     const {loading,error ,getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // addOnScroll();
        // window.addEventListener('scroll', addOnScroll);

        // return ()=>{
        //     window.removeEventListener('scroll', addOnScroll);
        // }
    }, [])

 


    const onRequest = (offset, initial) => {

        initial ? setNewItem(false) :setNewItem(true)


            getAllCharacters(offset)
            .then(onCharListLoaded)

    }

    

    const onCharListLoaded = (newCharlist) => {
        let ended = false
        if (newCharlist.length < 8) {
            ended = true;
        }


        setCharlist((charList) => [...charlist, ...newCharlist])

        setNewItem(loadNewItem => false)
        setOffset(offset => offset + 9)
        setCharended(charEnded => ended)
    }



    // const addOnScroll = () => {

    //     const currentHeight = window.scrollY,
    //         windowHeight = window.innerHeight,
    //         documentHeight = document.body.scrollHeight;
    //     if (currentHeight + windowHeight >= documentHeight) {
    //         onCharListLoading();
    //         onRequest(setOffset(offset))
    //     }

    // }



    const itemsRefs = useRef([]);


   const  focusOnSelectedItem = (id) => {
        itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRefs.current[id].classList.add('char__item_selected');
        itemsRefs.current[id].focus();
    }









   function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li tabIndex={0}
                    ref={el => itemsRefs.current[i] = el}
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnSelectedItem(i);
                    }
                    }
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

   
      
        const items = renderItems(charlist);
        const errorMessage = error ? <ErrorMesage /> : null;
        const spinner = loading && !loadNewItem ? <Spinner /> : null;
        

        return (
            <div className="char__list " >
                {errorMessage}
                {spinner}
        {items}
                <button
                    className="button button__main button__long"
                    disabled={loadNewItem} style={{ display: charEnded ? 'none' : 'block' }} onClick={() => onRequest(offset)}>

                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


export default CharList;