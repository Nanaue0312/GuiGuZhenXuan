<template>
	<template v-for="item in menus" :key="item.path">
		<!-- 没有子路由 -->
		<template v-if="!item.children">
			<el-menu-item
				:index="item.path"
				v-if="!item.meta.hidden"
				@click="goRoute">
				<el-icon>
					<component :is="item.meta.icon"></component>
				</el-icon>
				<template #title>
					<span>{{ item.meta.title }}</span>
				</template>
			</el-menu-item>
		</template>

		<!-- 只有一个子路由 -->
		<template v-if="item.children && item.children.length === 1">
			<el-menu-item
				@click="goRoute"
				:index="item.children[0].path"
				v-if="!item.children[0].meta.hidden">
				<el-icon>
					<component :is="item.children[0].meta.icon"></component>
				</el-icon>
				<template #title>
					<span>{{ item.children[0].meta.title }}</span>
				</template>
			</el-menu-item>
		</template>

		<!-- 有子路由，且个数大于1个 -->
		<template v-if="item.children && item.children.length > 1">
			<el-sub-menu :index="item.path">
				<template #title>
					<el-icon>
						<component :is="item.meta.icon"></component>
					</el-icon>
					<span>{{ item.meta.title }}</span>
				</template>
				<Menu :menus="item.children"></Menu>
			</el-sub-menu>
		</template>
	</template>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	// 获取路由器对象
	let $router = useRouter();
	defineProps(['menus']);
	const goRoute = (vc: any) => {
		// 路由跳转
		$router.push(vc.index);
	};
</script>
<script lang="ts">
	export default {
		name: 'Menu',
	};
</script>
<style scoped></style>
