///<reference types="react" />

declare module "app1/mainApp" {
	
	const MyApp1: React.ComponentType;

	export default MyApp1;
}

declare module "app1/counter" {
	const Counter: React.ComponentType;

	export default Counter;
}

declare module "app1/content1" {
	const Content1: React.ComponentType;

	export default Content1;
}


declare module "app2/mainApp" {
	const MyApp2: React.ComponentType;

	export default MyApp2;
}


declare module "app2/content" {
	const Content: React.ComponentType;

	export default Content;
}