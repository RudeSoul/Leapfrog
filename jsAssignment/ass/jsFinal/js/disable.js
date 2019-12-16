      leftCurvature.onchange = function() {
        if (leftCurvature.value !== "" || leftCurvature.value.length > 0) {
          rightCurvature.disabled = true;
        } else {
          rightCurvature.disabled = false;
        }
      };

      rightCurvature.onchange = function() {
        if (rightCurvature.value !== "" || rightCurvature.value.length > 0) {
          leftCurvature.disabled = true;
        } else {
          leftCurvature.disabled = false;
        }
      };