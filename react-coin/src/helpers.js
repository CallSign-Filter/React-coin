import React from 'react';

/**
 * Fetch error helper
 *
 * @param {object} response
 * @returns {Promise<T | never>}
 */

export const handleResponse = (response) => {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
};

/**
 * Renders the change in percent as green or red depending on value
 * 
 * @param {string} percent 
 */
export const renderChangePercent = (percent) => {
    if (percent > 0) {
        return <span className="percent-raised">{percent}% &uarr;</span>
    } else if(percent < 0) {
        return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
        return <span className="percent-unchanged">{percent}%</span>
    }
};