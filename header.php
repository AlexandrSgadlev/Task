<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @package WordPress
 * @since 1.0.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<!--<meta name="viewport" content="width=device-width, initial-scale=1" />-->
	<!--<link rel="pingback" href="<?php //bloginfo( 'pingback_url' ); ?>">-->
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

	<?php if ( function_exists( 'wp_body_open' ) ) : ?>
		<?php wp_body_open(); ?>
	<?php endif; ?>

	<div class="website-wrapper">

		<?php if ( function_exists( 'lts_get_layout_header_and_footer' ) ) : ?>
			<header class="lts-header">
				<?php 
					$active_layout = null;
					lts_get_layout_header_and_footer('header',$active_layout); 
				?>
			</header>
		<?php endif ?>


		<div id="content" class="site-content">
