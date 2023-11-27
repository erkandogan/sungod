export const fetchScenes = async () => {
  try {
    const response = await $fetch("/api/scene");
    const data = response as string;
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
