/**
 Module for the scenario upload and insert page of the vw-webapp

 Author: Matthew A. Turner
 Date: Feb 23, 2016
**/


/**
 * Box that contains the scenario list
 */
var ScenarioListBox = React.createClass({

    loadScenariosFromServer: function() {
        $.ajax({
            url: '/api/scenarios',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {
            data: {scenarios: []}
        };
    },

    componentDidMount: function() {
        this.loadScenariosFromServer();
        setInterval(this.loadScenariosFromServer, this.props.pollInterval);
    },

    render: function() {
        return (
            <div className="scenarioBox">
                <ScenarioList data={this.state.data} />
            </div>
        )
    }
});


/**
 * Scenario list contained within the box
 */
var ScenarioList = React.createClass({

    render: function() {
        var tableRows = this.props.data.scenarios.map(function(scenario) {

            return (
                <tr key={scenario.name}>
                    <td>{scenario.name}</td>
                    <td>{scenario.time_received}</td>
                    <td>{scenario.time_finished}</td>
                    <td style={{textAlign: 'center'}}>{scenario['total_fire_area(km^2)']}</td>
                    <td>
                        <a href={scenario.input.parameter}>
                            Download Input Parameters
                        </a>
                    </td>
                    <td>
                        <a href={scenario.output.data}>
                            Download Output Data
                        </a>
                    </td>
                    <td className="download-link">
                        <a href="#">Show Hydrograph</a>
                    </td>
                </tr>
            );
        });

        var scenarioList =
            <div className="scenarioList">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td><strong>Scenario Name</strong></td>
                            <td><strong>Time Received</strong></td>
                            <td><strong>Time Finished</strong></td>
                            <td><strong>Total Fire Area (km<sup>2</sup>)</strong></td>
                            <td><strong>Download Inputs</strong></td>
                            <td><strong>Download Outputs</strong></td>
                            <td className="download-link"><strong>View Hydrograph</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>

        return (
            <div className="scenarioList">
                {scenarioList}
            </div>
        );
    }
});


window.ScenarioListBox = ScenarioListBox;

/**
    Handle Form Submit; React would be overkill, but I do want to prevent
    page reloads for better UX.
**/
//$('form').submit(function(e) {
    //e.preventDefault();

    ////console.log($('form').serializeJSON());

    //var formData = new FormData();
    //var form = $('form').serializeArray();

    //var modelrunUUID;
    //for (var i = 0; i < form.length; i++)
    //{
        //if (form[i].name === 'modelrunUUID')
        //{
            //modelrunUUID = form[i].value;
        //}
        //formData.append(form[i].name, form[i].value);
    //}

    //formData.append('uploadedFile', $('#uploadedFile')[0].scenarios[0]);

    //var uploadUrl = '/api/scenarios/' + modelrunUUID + '/scenarios';

    //var values = $(this).serialize();
    //$.ajax({
        //method: 'post',
        //url: uploadUrl,
        //data: formData,
        //processData: false,
        //contentType: false
    //})
    //.done( function() {
        //$('#upload-success-message').slideUp(function() {
            //setTimeout(function() {
                //$('#upload-success-message').slideDown();
            //}, 4000)
        //});
    //})
    //.fail(function() {
        //$('#upload-fail-message').slideUp(function() {
            //setTimeout(function() {
                //$('#upload-fail-message').slideDown();
            //}, 4000)
        //});
    //})
//});
