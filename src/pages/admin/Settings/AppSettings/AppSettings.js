import React from 'react';

const AppSettings = (props) => {
    const { setGeneralSettings, generalSetting, saveSettings } = props;
    return (
        <div className='row'>
            <div className="col-md-6">
                <label for="appName" className="form-label">App Name</label>
                <input type="text" onChange={(e) => setGeneralSettings({ ...generalSetting, appName: e.target.value })} defaultValue={generalSetting.appName} className="form-control" id="appName" />
            </div>
            <div className="col-md-6">
                <label for="apiKey" className="form-label">MAP API KEY</label>
                <input type="password" onChange={(e) => setGeneralSettings({ ...generalSetting, apiKey: e.target.value })} defaultValue={generalSetting.apiKey} placeholder='Here.com API Key' className="form-control" id="apiKey" />
            </div>
            <div className="col-md-6">
                <label for="pricePerKm" className="form-label">Price Per Km</label>
                <input type="number" onChange={(e) => setGeneralSettings({ ...generalSetting, pricePerKm: e.target.value })} defaultValue={generalSetting.pricePerKm} className="form-control" id="pricePerKm" />
            </div>
            <div className="col-md-6">
                <label for="maxFreePeople" className="form-label">Max Free People</label>
                <input type="number" onChange={(e) => setGeneralSettings({ ...generalSetting, maxFreePeople: e.target.value })} defaultValue={generalSetting.maxFreePeople} className="form-control" id="maxFreePeople" />
            </div>
            <div className="col-md-6">
                <label for="pricePerExtraPeople" className="form-label">Price Per Extra People</label>
                <input type="number" onChange={(e) => setGeneralSettings({ ...generalSetting, pricePerExtraPeople: e.target.value })} defaultValue={generalSetting.pricePerExtraPeople} className="form-control" id="pricePerExtraPeople" />
            </div>
            <div className="col-md-6">
                <label for="maxPeople" className="form-label">Max People</label>
                <input type="number" onChange={(e) => setGeneralSettings({ ...generalSetting, maxPeople: e.target.value })} defaultValue={generalSetting.maxPeople} className="form-control" id="maxPeople" />
            </div>
            <div className="col-md-6">
                <label for="maxWeightPerPerson" className="form-label">Max Luggage Weight Per Person</label>
                <input type="number" onChange={(e) => setGeneralSettings({ ...generalSetting, maxWeightPerPerson: e.target.value })} defaultValue={generalSetting.maxWeightPerPerson} className="form-control" id="maxWeightPerPerson" />
            </div>
            <div className="col-md-6">
                <label for="currencySymbole" className="form-label">Currency Symbole</label>
                <input type="text" onChange={(e) => setGeneralSettings({ ...generalSetting, currencySymbole: e.target.value })} defaultValue={generalSetting.currencySymbole} className="form-control" id="currencySymbole" />
            </div>
            <div className="col-md-6">
                <label for="hqAddress" className="form-label">HQ Address</label>
                <input type="text" onChange={(e) => setGeneralSettings({ ...generalSetting, hqAddress: e.target.value })} defaultValue={generalSetting.currencySymbole} className="form-control" id="hqAddress" />
            </div>
            <div className="col-md-6">
                <label for="currencySymbole" className="form-label">Booking Notification Email</label>
                <input type="email" onChange={(e) => setGeneralSettings({ ...generalSetting, bookingNotificationEmail: e.target.value })} defaultValue={generalSetting.bookingNotificationEmail} className="form-control" id="currencySymbole" />
            </div>
            <div className="col-12">
                <button onClick={(e) => saveSettings(e)} type="submit" className="btn btn-primary">Save</button>
            </div>
        </div>
    );
};

export default AppSettings;