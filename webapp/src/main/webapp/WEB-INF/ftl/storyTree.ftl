<#ftl strip_whitespace=true><#compress>
<#include "storyTreeNode.ftl">
<#list stories as story>
	<@storyTreeNode story=story />
</#list> 
</#compress>