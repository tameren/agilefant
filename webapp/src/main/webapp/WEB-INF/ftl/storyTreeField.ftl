[#ftl]
[#macro storyTreeField story type]
	[#switch type]
		[#case "state"]
		  <span class="inlineStoryState storyState${story.state}" title="[@s.text name="story.state.${story.state}" /]">[@s.text name="story.stateAbbr.${story.state}" /]</span>
			[#break]
		[#case "storyPoints"]
			<span class="treeStoryPoints" title="Story points">${story.storyPoints!"&ndash;"}</span>
			[#break]
		[#case "labels"]
			[#if story.labels?size == 0]
				<span class="labelIcon labelIconNoLabel">&nbsp;</span>
			[#elseif story.labels?size == 1]
				<span class="labelIcon">[#list story.labels as label][#if label.name?length > 3]${label.name?substring(0, 4)}[#else]${label.name}[/#if][/#list]</span>
			[#else]
				<span class="labelIcon labelIconMultiple" title="">&nbsp;</span>
			[/#if]
			[#break]
		[#case "name"]
			<span class="storyTreeName">${story.name?html}</span>
			[#break]
		[#case "backlog"]
  		<span style="font-size:80%; color: #666;" title="Story's backlog">
    		([#if story.backlog??]${story.backlog.name?html}[/#if])
  		</span>
			[#break]
		[#case "breadcrumb"]
			[#if story.iteration??]
      <span style="font-size:80%; color: #666;" title="Story's iteration">
      	${"["}[#if !story.iteration.parent??]&#321;[/#if] ${story.iteration.name?html}${"]"}
      </span>
			[/#if]
			[#break]
	[/#switch]
[/#macro]