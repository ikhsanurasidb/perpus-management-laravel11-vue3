<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/counter";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, FolderPlus } from "lucide-vue-next";

const books = ref([]); // Ensure it's an array of objects
const store = useUserStore();
const therouter = useRouter();
const customConfig = {
    Authorization: "Bearer " + store.token,
};
const showDeleteDialog = ref(false);
const bookToDelete = ref(null);

onMounted(() => {
    refreshdata();
});

function refreshdata() {
    axios({
        url: "http://localhost:8000/api/book/buku",
        method: "get",
        headers: customConfig,
    })
        .then((response) => {
            books.value = response.data.data || []; // Handle API structure
            console.log(books.value);
        })
        .catch((error) => {
            console.log("AJAX" + error);
        });
}

function delete_dialog(isbn) {
    bookToDelete.value = isbn;
    showDeleteDialog.value = true;
}

function hapus() {
    if (!bookToDelete.value) return;

    axios({
        url: `http://localhost:8000/api/book/delete/${bookToDelete.value}`,
        method: "get", // Change to appropriate method if needed
        headers: customConfig,
    })
        .then((response) => {
            if (response.data.success) {
                refreshdata();
            }
        })
        .catch((error) => {
            console.log("AJAX" + error);
        })
        .finally(() => {
            showDeleteDialog.value = false;
            bookToDelete.value = null;
        });
}
</script>

<template>
    <div>
        <router-link :to="{ name: 'bukuview' }">
            <Button>
                <FolderPlus class="w-4 h-4 mr-2" />
                Add Book
            </Button>
        </router-link>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[100px]">No.</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead class="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, index) in books" :key="item.isbn">
                    <TableCell class="font-medium">{{ index + 1 }}</TableCell>
                    <TableCell>{{ item.isbn }}</TableCell>
                    <TableCell>{{ item.judul }}</TableCell>
                    <TableCell>{{ item.pengarang }}</TableCell>
                    <TableCell>{{ item.tahun }}</TableCell>
                    <TableCell class="text-right">
                        <router-link
                            :to="{
                                name: 'bukuview',
                                params: { theisbn: item.isbn },
                            }"
                        >
                            <Button variant="outline" size="sm" class="mr-2">
                                <Eye class="w-4 h-4 mr-2" />
                                View
                            </Button>
                        </router-link>
                        <Button
                            variant="outline"
                            size="sm"
                            @click="delete_dialog(item.isbn)"
                        >
                            <Trash2 class="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <AlertDialog
            :open="showDeleteDialog"
            @update:open="showDeleteDialog = $event"
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle
                        >Are you absolutely sure?</AlertDialogTitle
                    >
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the book and remove its data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel @click="showDeleteDialog = false"
                        >Cancel</AlertDialogCancel
                    >
                    <AlertDialogAction @click="hapus"
                        >Continue</AlertDialogAction
                    >
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</template>
