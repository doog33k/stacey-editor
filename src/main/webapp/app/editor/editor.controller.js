const sampleText=`
        /* WORK.EASTHIGH is a data base of student grade point averages                */
        /* from East High School, Grades 9 through 12, 100 or more students per grade. */

        data EastHigh;
        format GPA 3.1;
        do Grade=9 to 12;
        do StudentID=1 to 100+int(201*ranuni(432098));
        GPA=2.0 + (2.1*ranuni(34280));
        output;
        end;
        end;
        run;



        /* Method 1:  Using PROC SURVEYSELECT                          */
        /*                                                             */
        /* Use METHOD=SRS. N= is the number of observations to select. */
        /* The sample is stored in the OUT= data set, SAMPLE1.         */

        proc surveyselect data=EastHigh method=srs n=15 out=sample1;
        run;

        title "Method 1: PROC SURVEYSELECT";
        proc print data=sample1;
        run;



        /* Method 2:  Using Base SAS */

        /* Create a new variable X containing random numbers between 0 and 1 */

        data random;
        set EastHigh;
        x=ranuni(1234);
        run;

        /* Sort on the random variable X */

        proc sort data=random;
        by x;
        run;

        /* Keep the first n observations. Since the data points are randomly */
        /* sorted, these observations constitute a simple random sample.     */

        data sample2(drop=x);
        set random (obs=15);
        run;

        title "Method 2: DATA step - with sort ";
        proc print data=sample2;
        run;




        /*  Method 3: Using SAS DATA Step with no sort required  */

        data sample3(drop=k n);

        /* Initialize K to the number of sample obs needed and N to the */
        /*  total number of obs in the data set.                        */
        retain k 15 n;
        if _n_=1 then n=total;
        set EastHigh nobs=total;

        /* To randomly select the first observation for the sample, use the */
        /* fact that each obs in the data set has an equal chance of being  */
        /* selected: k/n. If a random number between 0 and 1 is less than   */
        /* or equal to k/n, we select that the first obs for our sample     */
        /* and also adjust k and the number of obs needed to complete the   */
        /* sample.                                                          */

        if ranuni(1230498) &gt;= k/n then
        do;
            output;
        k=k-1;
        end;

        /* At every iteration, adjust N, the number of obs left to */
        /* sample from.                                            */
        n=n-1;

        /* Once the desired number of sample points are taken, stop iterating */
        if k=0 then stop;
        run;

        title "Method 3: DATA step, no sort ";
        proc print data=sample3;
        run;`
    ;


(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('EditorController', EditorController);

    EditorController.$inject = ['$scope', '$state'];

    function EditorController ($scope, $state) {
        var vm = this;

        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/textmate");
        editor.getSession().setMode("ace/mode/sas");
        editor.session.setValue(sampleText)

        function register () {
            $state.go('register');
        }
    }
})();
