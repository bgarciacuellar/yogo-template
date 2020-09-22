$(function () {
    var isGoogleMapLoaded = false;

    $(document).ready(function () {
        initAll();
    });

    $(window).resize(function () {
        onResize();
    });

    function onResize() {}

    function initAll() {
        verifyGoogleMapLoad(function () {
            initHomeMap();
        });

        initBackgroundImages();
        initCancelledTripsControls();
        initCarTypeSelectionControls();
        initInputCounterControls();
        initDatepickerControls();
        initGallery();
        initPrintControls();
        initProfileListControls();
        initProgressBarControls();
        initRateTripControls();
        initReservationFormControls();
        initScrollAnimations();
        initSearchFormControls();
        initSimpleForms();
        initSwapActions();
        initTopNotificationControls();
        initUnitAvailabilityControls();
        registerToMailchimpHandler();
    }

    function initBackgroundImages() {
        var wrapper = $(".yg-bg-img-wrapper");
        if (wrapper.length) {
            wrapper.each(function () {
                var imgWrapper = $(this);
                var img = imgWrapper.find('img');

                var imgStyleUrl = `url(${img.attr('src')})`;

                imgWrapper.css('background-image', imgStyleUrl);
            });
        }
    }

    function initCancelledTripsControls() {
        var counterWrappers = $(".yg-cancelled-trips-counter");
        if (counterWrappers.length) {
            counterWrappers.each(function () {
                var counterWrapper = $(this);
                var cancelledTrips = parseInt(counterWrapper.data('cancelled-trips'));

                if (cancelledTrips && cancelledTrips > 0) {
                    for (var i = 0; i < cancelledTrips; i++) {
                        var img = counterWrapper.find('img').eq(i);
                        img.attr('src', 'img/icons/circle-filled.svg');
                    }
                }
            });
        }
    }

    function initCarTypeSelectionControls() {
        var vehicleInputGroups = $(".yg-vehicles-input-group");
        if (vehicleInputGroups.length) {
            vehicleInputGroups.each(function () {
                var group = $(this);
                var vehicleInput = group.find('.yg-vehicles-input');
                var vehicleSelect = group.find('.yg-vehicles-select');
                var vehicles = group.find('.yg-vehicle-items .yg-vehicle-item');

                vehicleSelect.change(function () {
                    var selectedValue = $(this).val();
                    var selectedLabel = vehicleSelect.find('option:selected').html();

                    vehicles.hide();

                    if (selectedValue) {
                        vehicles.each(function () {
                            var vehicle = $(this);
                            var type = vehicle.data('type');
                            if (type == selectedValue) {
                                vehicle.fadeIn();
                                vehicleInput.val(selectedLabel);
                            }
                        });
                    } else {
                        vehicleInput.val('');
                        group.find('.yg-default-vehicle-item').fadeIn();
                    }
                });

            });
        }
    }

    function initInputCounterControls() {
        var counterController = $('.yg-passenger-counter-controller');

        if (counterController.length) {
            counterController.each(function () {

                var ctrl = $(this);

                var decreaseBtn = ctrl.find('.decrease');
                var increaseBtn = ctrl.find('.increase');
                var input = ctrl.find('input');

                decreaseBtn.click(function (e) {
                    e.preventDefault();
                    var value = parseInt(input.val());
                    if (value > 0) {
                        input.val(value - 1);
                        populatePassengersInput();
                    }
                });

                increaseBtn.click(function (e) {
                    e.preventDefault();
                    var value = parseInt(input.val());
                    input.val(value + 1);
                    populatePassengersInput();
                });
            });
        }
    }

    function initDatepickerControls() {
        var format = 'dd/mm/yyyy';

        // input datepicker
        var input = $('.yg-datepicker-input');
        if (input.length) {
            input.each(function () {
                $(this).datepicker({
                    format: format,
                    language: 'es',
                    todayHighlight: true,
                    orientation: 'bottom',
                    autoclose: true,
                });
            });
        }

        // inline datepicker datepicker
        var inlineDatepicker = $('.yg-inline-datepicker');
        if (inlineDatepicker.length) {
            inlineDatepicker.each(function () {
                var datepickerElem = inlineDatepicker.find('.yg-inline-datepicker-selection');
                datepickerElem.datepicker({
                    format: format,
                    language: 'es',
                    todayHighlight: true,
                    inputs: $('.yg-range-date')
                });
            });
        }

        // inline datpicker multiple
        var inlineDatepickerMultiple = $('.yg-inline-datepicker-multiple');
        if (inlineDatepickerMultiple.length) {
            inlineDatepickerMultiple.each(function () {
                var datepickerElem = inlineDatepickerMultiple.find('.yg-inline-datepicker-selection');
                var hiddenInput = inlineDatepickerMultiple.find('.yg-inline-datepicker-input');

                datepickerElem.datepicker({
                    format: format,
                    language: 'es',
                    todayHighlight: true,
                    multidate: true,
                });

                datepickerElem.on('changeDate', function () {
                    var selectedDates = datepickerElem.datepicker('getFormattedDate');
                    hiddenInput.val(selectedDates);
                });
            });
        }

        // clear inline datepicker trigger
        $('.yg-inline-datepicker-date-clear').click(function (e) {
            e.preventDefault();
            $('.yg-inline-datepicker-selection').datepicker('clearDates');
        });
    }

    function initGallery() {
        var galleries = $('.yg-gallery');
        if (galleries.length) {
            galleries.each(function () {
                var gallery = $(this);
                var carouselElem = gallery.find('.carousel');
                if (carouselElem) {
                    carouselElem.carousel();

                    var thumbnailItems = gallery.find('.yg-gallery-thumbnail');

                    thumbnailItems.click(function () {
                        var index = $(this).index();
                        carouselElem.carousel(index);
                    });

                }
            });
        }
    }

    function initPrintControls() {
        var printTrigger = $(".yg-print-trigger");
        printTrigger.click(function () {
            window.print();
            return false;
        });
    }

    function initProfileListControls() {
        var profileList = $('.yg-profile-list');
        if (profileList.length) {
            profileList.each(function () {
                var list = $(this);
                var hiddenList = list.find('.yg-hidden-profile-list');
                var btn = list.find('.yg-hidden-profile-trigger');

                btn.click(function () {
                    btn.hide();
                    hiddenList.fadeIn();
                });
            });
        }
    }

    function initProgressBarControls() {
        var progressBars = $('.yg-progress-list-bar');
        if (progressBars.length) {
            progressBars.each(function () {
                var bar = $(this);
                var progress = parseInt(bar.data('progress'));

                if (progress > 100) {
                    progress = 100;
                } else if (progress < 0) {
                    progress = 0;
                }

                var progressWidth = `${progress}%`;

                bar.css('width', progressWidth)
            });
        }
    }

    function initHomeMap() {
        var placeMarker = function (event, marker, map) {
            if (marker) {
                marker.setPosition(event.latLng);
            } else {
                marker = new google.maps.Marker({
                    position: event.latLng,
                    map: map,
                    draggable: true,
                });
            }
            marker.setMap(map);
            map.panTo(event.latLng);
        };

        var maps = $('.yg-map');

        if (maps.length) {
            maps.each(function () {
                var mapWrapper = $(this);
                var marker;

                var mapId = mapWrapper.data('map-id');
                var mapElem = document.getElementById(mapId);

                var dataLat = mapWrapper.data('lat');
                var dataLng = mapWrapper.data('lng');

                var position = {
                    lat: dataLat || 20.65988743765361,
                    lng: dataLng || -103.34962499999999,
                };

                var map = new google.maps.Map(mapElem, {
                    center: position,
                    zoom: 12,
                    disableDefaultUI: false,
                    fullscreenControl: true,
                });

                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    draggable: true,
                });

                if (!dataLat && !dataLng) {
                    marker.setMap(null);
                }

                // google.maps.event.addListener(map, 'click', function (e) {
                //     placeMarker(e, marker, map);
                // });
            });
        }
    }

    function initRateTripControls() {
        var inputGroups = $('.yg-rate-trip-input-group');

        if (inputGroups.length) {
            inputGroups.each(function () {
                var inputGroup = $(this);

                var stars = inputGroup.find('.yg-rate-icon-star');

                stars.click(function () {
                    var star = $(this);
                    var rate = $(this).index() + 1;

                    if (star.index() == 0) {
                        if (star.hasClass('filled') && !star.next().hasClass('filled')) {
                            rate -= 1;
                        }
                    }

                    fillStars(stars, rate);
                    fillInput(inputGroup, rate);
                });

                // fill previous
                var previousRate = parseInt(inputGroup.find('.yg-rate-trip-input').val());
                fillStars(stars, previousRate);
            });
        }

        function fillStars(stars, rate) {
            stars.each(function () {
                var star = $(this);
                var starValue = star.index() + 1;

                if (starValue <= rate) {
                    star.addClass('filled');
                } else {
                    star.removeClass('filled');
                }

            });
        }

        function fillInput(inputGroup, rate) {
            var input = inputGroup.find('.yg-rate-trip-input');
            input.val(rate);
        }
    }

    function initReservationFormControls() {
        var wrapper = $(".yg-car-info-form");
        if (wrapper.length) {
            wrapper.each(function () {
                var wrapperElem = $(this);

                var quantityWrapper = wrapperElem.find('.yg-pet-selection-quantity');
                var amountWrapper = wrapperElem.find('.yg-pet-selection-amount');

                var petSelect = wrapperElem.find('.yg-pet-selection');

                if (petSelect) {
                    petSelect.change(function () {
                        var quantity = $(this).val();
                        if (!quantity) {
                            quantity = 0;
                        }
                        var basePrice = parseFloat($(this).data('base-price'));
                        var amount = quantity * basePrice;

                        quantityWrapper.html(quantity);
                        amountWrapper.html(amount.toFixed(2));

                        calculateTotals(wrapperElem);
                    });
                }

                calculateTotals(wrapperElem);
            });
        }

        function calculateTotals(wrapperElem) {
            var total = 0;

            // trip
            var tripAmountWrapper = wrapperElem.find('.yg-trip-subtotal-amount');
            total += parseFloat(tripAmountWrapper.text());

            // pets
            var petsAmountWrapper = wrapperElem.find('.yg-pet-selection-amount');
            if (petsAmountWrapper.length) {
                total += parseFloat(petsAmountWrapper.text());
            }

            // iva
            var ivaWrapper = wrapperElem.find('.yg-trip-iva');
            var baseIva = ivaWrapper.data('base-iva');
            var ivaAmount = total * baseIva * 0.01;
            ivaWrapper.html(ivaAmount.toFixed(2));
            total += ivaAmount

            // total
            var totalWrapper = wrapperElem.find('.yg-trip-total');
            totalWrapper.html(total.toFixed(2));
        }
    }

    function initScrollAnimations() {
        ScrollReveal().reveal('.yg-scroll-reveal', {
            duration: 800,
        });
    }

    function initSearchFormControls() {
        var searchForms = $('.yg-search-form-controls');

        if (searchForms.length) {
            searchForms.each(function () {
                var searchForm = $(this);

                // walk by radio btn
                var walkByRadio = searchForm.find('.yg-sf-walk-by');
                var walkByControl = false;
                walkByRadio.click(function () {
                    var newStatus = !walkByControl;
                    $(this).prop('checked', newStatus);
                    walkByControl = newStatus;
                });

                // location selection
                var ygLocationInsideInput = searchForm.find('.yg-sf-location-inside');
                var ygLocationOutsideInput = searchForm.find('.yg-sf-location-outside');

                // journey type selection
                var ygJourneyByTimeInput = searchForm.find('.yg-sf-journey-by-time');
                var ygJourneyByTravelInput = searchForm.find('.yg-sf-journey-by-travel');

                // transport type selection
                var ygTransportRoundInput = searchForm.find('.yg-sf-transport-round');
                var ygTransportOneWayInput = searchForm.find('.yg-sf-transport-one-way');


                // location selection events
                ygLocationInsideInput.change(function () {
                    if ($(this).is(':checked')) {
                        showInsideSelectionCheckboxes(searchForm);
                        hideOutsideSelectionCheckboxes(searchForm);
                    } else {
                        showOutsideSelectionCheckboxes(searchForm);
                        hideInsideSelectionCheckboxes(searchForm);
                    }

                    // default option when form is visible
                    if (isFormVisible(searchForm)) {
                        ygJourneyByTimeInput.trigger('click');
                    }
                });

                ygLocationOutsideInput.change(function () {
                    if ($(this).is(':checked')) {
                        hideInsideSelectionCheckboxes(searchForm);
                        showOutsideSelectionCheckboxes(searchForm);
                    } else {
                        showInsideSelectionCheckboxes(searchForm);
                        hideOutsideSelectionCheckboxes(searchForm);
                    }

                    // default option when form is visible
                    if (isFormVisible(searchForm)) {
                        ygTransportRoundInput.trigger('click');
                    }
                });


                // journey by time selection events
                ygJourneyByTimeInput.change(function () {
                    if ($(this).is(':checked')) {
                        uncheckCheckboxes(searchForm, ['journey-by-travel', 'transport-round', 'transport-one-way']);
                        disableInputs(searchForm, ['to', 'return-date', 'return-time']);
                        showSearchFormInputs(searchForm);
                    }
                });

                ygJourneyByTravelInput.change(function () {
                    if ($(this).is(':checked')) {
                        uncheckCheckboxes(searchForm, ['journey-by-time', 'transport-round', 'transport-one-way']);
                        disableInputs(searchForm, ['to', 'duration']);
                        showSearchFormInputs(searchForm);
                    }
                });

                // transport type selection events
                ygTransportRoundInput.change(function () {
                    if ($(this).is(':checked')) {
                        uncheckCheckboxes(searchForm, ['journey-by-time', 'journey-by-travel', 'transport-one-way']);
                        disableInputs(searchForm, ['duration']);
                        showSearchFormInputs(searchForm);
                    }
                });

                ygTransportOneWayInput.change(function () {
                    if ($(this).is(':checked')) {
                        uncheckCheckboxes(searchForm, ['journey-by-time', 'journey-by-travel', 'transport-round']);
                        disableInputs(searchForm, ['to', 'duration']);
                        showSearchFormInputs(searchForm);
                    }
                });

                // passengers popup controller
                var passengersGroup = searchForm.find('.yg-passengers-input-group');
                var passengersInput = passengersGroup.find('.yg-passengers-input');
                var passengersMask = passengersGroup.find('.yg-passengers-input-mask');

                passengersInput.mouseleave(function () {
                    if (!$(this).is(':focus')) {
                        passengersHideHandler(searchForm);
                    }
                });
                passengersInput.focus(function () {
                    passengersShowHandler(searchForm);
                });
                passengersInput.click(function () {
                    passengersShowHandler(searchForm);
                });
                passengersInput.blur(function () {
                    passengersHideHandler(searchForm);
                });
                passengersMask.mouseenter(function () {
                    passengersShowHandler(searchForm);
                });
                passengersMask.click(function () {
                    passengersShowHandler(searchForm);
                });
                passengersMask.mouseleave(function () {
                    passengersHideHandler(searchForm);
                });


                // vehicles popup controller
                var vehiclesGroup = searchForm.find('.yg-vehicles-input-group');
                var vehiclesInput = vehiclesGroup.find('.yg-vehicles-input');
                var vehiclesMask = vehiclesGroup.find('.yg-vehicles-input-mask');


                vehiclesInput.mouseleave(function () {
                    if (!$(this).is(':focus')) {
                        vehiclesHideHandler(searchForm);
                    }
                });
                vehiclesInput.focus(function () {
                    vehiclesShowHandler(searchForm);
                });
                vehiclesInput.click(function () {
                    vehiclesShowHandler(searchForm);
                });
                vehiclesInput.blur(function () {
                    vehiclesHideHandler(searchForm);
                });
                vehiclesMask.mouseenter(function () {
                    vehiclesShowHandler(searchForm);
                });
                vehiclesMask.click(function () {
                    vehiclesShowHandler(searchForm);
                });
                vehiclesMask.mouseleave(function () {
                    vehiclesHideHandler(searchForm);
                });
            });
        }

        function showInsideSelectionCheckboxes(searchForm) {
            searchForm.find('.yg-sf-location-inside-selection').show();
        }

        function showOutsideSelectionCheckboxes(searchForm) {
            searchForm.find('.yg-sf-location-outside-selection').show();
        }

        function hideInsideSelectionCheckboxes(searchForm) {
            searchForm.find('.yg-sf-location-inside-selection').hide();
        }

        function hideOutsideSelectionCheckboxes(searchForm) {
            searchForm.find('.yg-sf-location-outside-selection').hide();
        }

        function showSearchFormInputs(searchForm) {
            searchForm.find('.yg-sf-inputs-wrapper').fadeIn();
        }

        function disableInputs(searchForm, disabledInputSubclasses) {
            enableInputs(searchForm);

            for (var i = 0; i < disabledInputSubclasses.length; i++) {
                var disabledClass = disabledInputSubclasses[i];

                var inputWrapper = searchForm.find(`.yg-sf-input-wrapper.${disabledClass}`);

                if (inputWrapper.length) {
                    inputWrapper.hide();
                }
            }
        }

        function enableInputs(searchForm) {
            searchForm.find(`.yg-sf-input-wrapper`).each(function () {
                var inputWrapper = $(this);
                inputWrapper.show();
            });
        }

        function uncheckCheckboxes(searchForm, checkboxList) {
            for (var i = 0; i < checkboxList.length; i++) {
                var checkboxClassPartial = checkboxList[i];

                var checkbox = searchForm.find(`.yg-sf-${checkboxClassPartial}`);

                if (checkbox) {
                    checkbox.prop('checked', false);
                }
            }
        }

        function isFormVisible(searchForm) {
            var controlCheckboxes = ['journey-by-time', 'journey-by-travel', 'transport-round', 'transport-one-way'];

            for (var i = 0; i < controlCheckboxes.length; i++) {
                var checkboxClassPartial = controlCheckboxes[i];

                var checkbox = searchForm.find(`.yg-sf-${checkboxClassPartial}`);

                if (checkbox && checkbox.prop('checked')) {
                    return true;
                }
            }

            return false;
        }

        // passengers popup
        var passengersTimeout = null;

        function passengersShowHandler(searchForm) {
            clearTimeout(passengersTimeout);
            showPassengersDisplay(searchForm);
        }

        function passengersHideHandler(searchForm) {
            passengersTimeout = setTimeout(function () {
                hidePassengersDisplay(searchForm);
            }, 300);
        }

        function showPassengersDisplay(searchForm) {
            searchForm.find('.yg-passengers-input-mask').fadeIn('fast');
        }

        function hidePassengersDisplay(searchForm) {
            searchForm.find('.yg-passengers-input-mask').stop(true, true).fadeOut('fast');
        }

        // vehicles popup
        var vehiclesTimeout = null;

        function vehiclesShowHandler(searchForm) {
            clearTimeout(vehiclesTimeout);
            showVehiclesDisplay(searchForm);
        }

        function vehiclesHideHandler(searchForm) {
            vehiclesTimeout = setTimeout(function () {
                hideVehiclesDisplay(searchForm);
            }, 300);
        }

        function showVehiclesDisplay(searchForm) {
            searchForm.find('.yg-vehicles-input-mask').fadeIn('fast');
        }

        function hideVehiclesDisplay(searchForm) {
            searchForm.find('.yg-vehicles-input-mask').stop(true, true).fadeOut('fast');
        }
    }

    function initSimpleForms() {
        var forms = $('.yg-simple-form');

        if (forms.length) {
            forms.each(function () {
                var form = $(this);

                var controls = form.find('.yg-simple-form-control');
                if (controls.length) {
                    controls.each(function () {
                        var control = $(this);

                        var value = control.find('.yg-simple-form-input-value');
                        var input = control.find('.yg-simple-form-input-box');

                        var editBtn = control.find('.yg-simple-form-edit-btn');
                        var cancelBtn = control.find('.yg-simple-form-cancel-btn');
                        var saveBtn = control.find('.yg-simple-form-save-btn');

                        editBtn.click(function (e) {
                            e.preventDefault();
                            value.hide();
                            input.fadeIn();
                        });

                        cancelBtn.click(function (e) {
                            e.preventDefault();
                            input.hide();
                            value.fadeIn();
                        });

                        saveBtn.click(function (e) {
                            e.preventDefault();
                            input.hide();
                            value.fadeIn();
                        });

                    });
                }
            });
        }
    }

    function initSwapActions() {
        var swaps = $(".yg-swap-action");
        if (swaps.length) {
            swaps.each(function () {
                var swap = $(this);
                var trigger = swap.find('.yg-swap-trigger');
                var content = swap.find('.yg-swap-content');

                trigger.click(function () {
                    trigger.hide();
                    content.fadeIn();
                });
            });
        }
    }

    function populatePassengersInput() {
        var passengerCounterInputs = $('.yg-counter-passenger');
        var passengerInputContents = [];
        passengerCounterInputs.each(function () {
            var input = $(this);
            var quantity = input.val();
            var prefix = input.data('prefix-label');

            passengerInputContents.push(`${prefix}:${quantity}`);
        });

        var passengerInput = $('.yg-passengers-input');
        var passengerInputVal = passengerInputContents.join(',');
        passengerInput.val(passengerInputVal);
    }

    function initTopNotificationControls() {
        var notifications = $(".yg-top-notification");
        if (notifications.length) {
            notifications.each(function () {
                var notification = $(this);
                var close = notification.find('.yg-top-notification-close');

                close.click(function () {
                    notification.fadeOut();
                });

                setTimeout(function () {
                    notification.fadeOut();
                }, 4500);
            });
        }
    }

    function initUnitAvailabilityControls() {
        var isValidDate = (s) => {
            var bits = s.split('/');
            var d = new Date(bits[2] + '/' + bits[1] + '/' + bits[0]);
            return !!(d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]));
        };

        var unavailableDatesHandler = (wrapper) => {
            var unavailableDatesLabel = wrapper.find('.yg-unavailable-dates-label');
            var unavailableDates = wrapper.find('.yg-unit-availability-dinamic-container .yg-unit-availability-date');

            if (unavailableDates.length) {
                unavailableDatesLabel.fadeIn();
            } else {
                unavailableDatesLabel.fadeOut();
            }
        };

        $(document).on('click', '.yg-unit-availability-delete', function () {
            var wrapper = $(this).closest('.yg-unit-availability-item').first();
            $(this).closest('.yg-unit-availability-date').remove();
            unavailableDatesHandler(wrapper);
        });

        var availabilityItems = $(".yg-unit-availability-item");
        if (availabilityItems.length) {
            availabilityItems.each(function () {
                var wrapper = $(this);
                var invalidLabel = wrapper.find(".yg-unit-availability-invalid");

                wrapper.find('.yg-unit-availability-btn').click(function () {
                    var template = wrapper.find('.yg-unit-availability-date.template').clone();
                    template.removeClass('template');

                    var startInput = wrapper.find(".yg-availability-input-start");
                    var endInput = wrapper.find(".yg-availability-input-end");

                    var startValue = startInput.val();
                    var endValue = endInput.val();

                    // validate
                    var isValid = true;

                    if (!startValue || !endValue) {
                        isValid = false;
                    } else {
                        if (!isValidDate(startValue) || !isValidDate(endValue)) {
                            isValid = false;
                        } else {
                            var startValueParts = startValue.split('/');
                            var startYear = startValueParts[2];
                            var startMonth = startValueParts[1];
                            var startDay = startValueParts[0];

                            var endValueParts = endValue.split('/');
                            var endYear = endValueParts[2];
                            var endMonth = endValueParts[1];
                            var endDay = endValueParts[0];

                            var startDate = new Date(`${startYear}-${startMonth}-${startDay}`);
                            var endDate = new Date(`${endYear}-${endMonth}-${endDay}`);

                            if (startDate > endDate) {
                                isValid = false;
                            }
                        }
                    }

                    if (isValid) {
                        invalidLabel.fadeOut();

                        // success 
                        template.find('.yg-unit-availability-date-start').text(startValue);
                        template.find('.yg-unit-availability-date-end').text(endValue);

                        startInput.val('');
                        endInput.val('');

                        wrapper.find('.yg-unit-availability-dinamic-container').append(template);

                        unavailableDatesHandler(wrapper);
                    } else {
                        // fail
                        invalidLabel.fadeIn();
                    }
                });

                unavailableDatesHandler(wrapper);
            });
        }
    }

    function registerToMailchimpHandler() {
        var form = $('#newsletterForm');
        var requestUrl = 'requests/mailchimpProcess.php';

        if (form.length) {
            form.submit(function (e) {
                e.preventDefault();

                var requestData = {
                    email: form.find('#newsletterEmail').val()
                };

                $.post(requestUrl, requestData, function (res) {
                    if (res.success) {
                        form.find('#newsletterSuccess').fadeIn();
                        form[0].reset();
                    }
                }, 'json');

                return false;
            });
        }
    }

    function verifyGoogleMapLoad(cb) {
        var googleCheckInterval = setInterval(function () {
            if (typeof google === 'object' && typeof google.maps === 'object') {
                clearInterval(googleCheckInterval);
                isGoogleMapLoaded = true;

                if (typeof cb === 'function') {
                    cb();
                }
            }
        }, 250);
    }
});