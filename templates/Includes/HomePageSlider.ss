<% if Slides %>

	<section class="slider<% if AutoSlide %> autoslide<% end_if %>">
		
		<% loop Slides %>
		
			<div id="slide-{$Pos}" class="slide {$TextColor}-text $FirstLast<% if First %> current<% else %> hide<% end_if %>" style="background-image: url({$Image.Link});" data-slide="$Pos">
			
				<div class="inner">
			
					<% if Title %>
						<h2>$Title</h2>
					<% end_if %>
					
					<% if Text %>
						<p class="test">$Text</p>
					<% end_if %>
					
					<% if Link %>
						<a href="$Link" class="button">
							<% if LinkText %>
								$LinkText
							<% else %>
								Read more
							<% end_if %>
						</a>
					<% end_if %>
				
				</div>
				
			</div>
			
		<% end_loop %>
		
		<% if Slides.Count > 1 %>
		
			<nav class="slider-nav">
			
				<% loop Slides %>
					<a href="javascript:void(0);" class="$FirstLast<% if First %> current<% end_if %>" data-slide="$Pos"></a>
				<% end_loop %>
			
			</nav>
			
		<% end_if %>
		
	</section>

<% end_if %>