import React, { FunctionComponent } from 'react';

type HighlightedNotes = {
    note: string;
    color: string;
  };

type FretProps = {
    rootNote: string;
    fretNumber: number;
    highlightedNotes: HighlightedNote[];
};

const Fret: FunctionComponent<FretProps> = ({ rootNote, fretNumber, highlightedNotes }) => {
    return ( 
        <div className="fret">
            <div className="fret__string"></div>
            <div className="fret__string"></div>
            <div className="fret__string"></div>
            <div className="fret__string"></div>
            <div className="fret__string"></div>
            <div className="fret__string"></div>
        </div>
    );
};

export default Fret;
