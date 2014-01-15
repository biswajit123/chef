<?php
/**
 * Main admin class
 *
 * @author Your Inspiration Themes
 * @package YITH Topbar Countdown
 * @version 1.0.0
 */

// Exit if accessed directly

if ( !defined( 'YITH_TCOUNTDOWN' ) ) { exit; }

global $yith_tcountdown_options;

$yith_tcountdown_options = array(

    /*ADD GENERAL TABS*/

    'general' => array(
        'label' => __('General', 'yit'),
        'sections' => array(
            'general' => array(
                'title' =>  __('General Settings', 'yit'),
                'description' => '',
                'fields' => array(

                    'yith_tcountdown_enable' => array(
                        'title' => __('Enable Topbar Countdown', 'yit'),
                        'description' => __( 'Enable the topbar countdown banner. (Default: Off)', 'yit' ),
                        'type' => 'checkbox',
                        'std' => false
                    ),

                    'yith_tcountdown_icon' => array(
                        'title' => __('Logo', 'yit'),
                        'description' => __( "Upload or choose from your media library the logo image, if you don't need it anymore simply delete it.", 'yit' ),
                        'type' => 'upload',
                        'std' => YITH_TCOUNTDOWN_URL . 'assets/images/icon.png',
                    ),

                    'yith_tcountdown_slogan' => array(
                        'title' => __('Slogan Text', 'yit'),
                        'description' => __( "Enter the topbar slogan", 'yit' ),
                        'type' => 'text',
                        'std' => '[LOREM IPSUM] DOLOR SIT!',
                    ),

                    'yith_tcountdown_message' => array(
                        'title' => __('Message', 'yit'),
                        'description' => __( "Enter the message text", 'yit' ),
                        'type' => 'text',
                        'std' => __('to offering expiration', 'yit'),
                    ),

                    'yith_tcountdown_link' => array(
                        'title' => __('Link Url', 'yit'),
                        'description' => __( "Enter the link", 'yit' ),
                        'type' => 'text',
                        'std' => '#',
                    ),

                    'yith_tcountdown_button_text' => array(
                        'title' => __('Button Text', 'yit'),
                        'description' => __( "Enter the Button Text", 'yit' ),
                        'type' => 'text',
                        'std' => __("Book Now", 'yit'),
                    ),

                    'yith_tcountdown_date' => array(
                        'title' => __('Countdown to', 'yit'),
                        'description' => __( "The date when the countdown will stop.", 'yit' ),
                        'type' => 'datepicker',

                    ),
                ),

            ),
        )
    ),

    /*ADD BACKGROUND TAB*/

    'background' => array(
        'label' => __('Background', 'yit'),
        'sections' => array(
            'background' => array(
                'title' =>  __('Background Settings', 'yit'),
                'description' => __('Customize the background of topbar countdown', 'yit'),
                'fields' => array(

                    'yith_tcountdown_background_image' => array(
                        'title' =>  __('Background image', 'yit'),
                        'description' => __("Upload or choose from your media library the background image, if you don't need it anymore simply delete it.", 'yit'),
                        'type' => 'upload',
                        'std' => YITH_TCOUNTDOWN_URL . 'assets/images/pattern.png',
                    ),

                    'yith_tcountdown_background_color' => array(
                        'title' =>  __('Background Color', 'yit'),
                        'description' => __('Choose a background color', 'yit'),
                        'type' => 'colorpicker',
                        'std' => '#144a60',
                    ),

                    'yith_tcountdown_background_repeat' => array(
                        'title' =>  __('Background Repeat', 'yit'),
                        'description' => __( 'Select the repeat mode for the background image.', 'yit' ),
                        'type' => 'select',
                        'std' => apply_filters( 'yith_tcountdown_background_repeat_std', 'repeat' ),
                        'options' => array(
                            'repeat' => __( 'Repeat', 'yit' ),
                            'repeat-x' => __( 'Repeat Horizontally', 'yit' ),
                            'repeat-y' => __( 'Repeat Vertically', 'yit' ),
                            'no-repeat' => __( 'No Repeat', 'yit' ),
                        )
                    ),

                    'yith_tcountdown_background_position' => array(
                        'title' =>  __('Background Position', 'yit'),
                        'description' =>  __( 'Select the position for the background image.', 'yit' ),
                        'type' => 'select',
                        'std' => apply_filters( 'yith_tcountdown_background_position_std', 'top left' ),
                        'options' => array(
                            'center' => __( 'Center', 'yit' ),
                            'top left' => __( 'Top left', 'yit' ),
                            'top center' => __( 'Top center', 'yit' ),
                            'top right' => __( 'Top right', 'yit' ),
                            'bottom left' => __( 'Bottom left', 'yit' ),
                            'bottom center' => __( 'Bottom center', 'yit' ),
                            'bottom right' => __( 'Bottom right', 'yit' ),
                        ),
                    ),

                    'yith_tcountdown_background_attachment' => array(
                        'title' =>  __('Background Attachment', 'yit'),
                        'description' => __( 'Select the attachment for the background image.', 'yit' ),
                        'type' => 'select',
                        'std' => apply_filters( 'yith_tcountdown_background_attachment_std', 'scroll' ),
                        'options' => array(
                            'scroll' => __( 'Scroll', 'yit' ),
                            'fixed' => __( 'Fixed', 'yit' ),
                        ),
                    ),

                    'yith_tcountdown_button_color' => array(
                        'title' =>  __('Button Background Color', 'yit'),
                        'description' => __('Choose a button background color', 'yit'),
                        'type' => 'colorpicker',
                        'std' => '#aa2929',
                    ),

                    'yith_tcountdown_button_hover_color' => array(
                        'title' =>  __('Button Hover Background Color', 'yit'),
                        'description' => __('Choose a button hover background color', 'yit'),
                        'type' => 'colorpicker',
                        'std' => '#821919',
                    ),
                )
            )
        )
    ),

    /*ADD TYPOGRAPHY TAB*/

    'typography' => array(
        'label' => __('Typography', 'yit'),
        'sections' => array(
            'background' => array(
                'title' =>  __('Typography Settings', 'yit'),
                'description' => __('Customize the typography of topbar countdown', 'yit'),
                'fields' => array(

                    'yith_tcountdown_slogan_font' => array(
                        'title' =>  __('Slogan font of message', 'yit'),
                        'description' => __('Choose the font type, size and color for the slogan text.', 'yit'),
                        'type' => 'typography',
                        'std' => array(
                            'size' => 30,
                            'unit' => 'px',
                            'family' => 'Yanone Kaffeesatz',
                            'style' => 'regular',
                            'color' => '#FFFFFF',
                        ),
                    ),

                    'yith_tcountdown_bold_font' => array(
                        'title' =>  __('Bold Slogan font of message', 'yit'),
                        'description' => __('Choose the font type, size and color for the bold text.', 'yit'),
                        'type' => 'typography',
                        'std' => array(
                            'size' => 30,
                            'unit' => 'px',
                            'family' => 'Yanone Kaffeesatz',
                            'style' => 'bold',
                            'color' => '#b8cad1',
                        ),
                    ),

                    'yith_tcountdown_number_font' => array(
                        'title' =>  __('Numbers Font', 'yit'),
                        'description' => __('Choose the font type, size and color for days, hours, minutes and seconds.', 'yit'),
                        'type' => 'typography',
                        'std' => array(
                            'size' => 40,
                            'unit' => 'px',
                            'family' => 'Yanone Kaffeesatz',
                            'style' => 'bold',
                            'color' => '#b8cad1',
                        ),
                    ),

                    'yith_tcountdown_message_font' => array(
                    'title' =>  __('Message Font', 'yit'),
                    'description' => __('Choose the font type, size and color for the paragraphs inside the message text.', 'yit'),
                    'type' => 'typography',
                    'std' => array(
                        'size' => 25,
                        'unit' => 'px',
                        'family' => 'Yanone Kaffeesatz',
                        'style' => 'regular',
                        'color' => '#FFFFFF',
                        ),
                    ),

                    'yith_tcountdown_button_font' => array(
                    'title' =>  __('Button Font', 'yit'),
                    'description' => __('Choose the font type, size and color for the paragraphs inside the button.', 'yit'),
                    'type' => 'typography',
                    'std' => array(
                        'size' => 25,
                        'unit' => 'px',
                        'family' => 'Yanone Kaffeesatz',
                        'style' => 'bold',
                        'color' => '#FFFFFF',
                        ),
                    ),
                )
            )
        )
    ),
);