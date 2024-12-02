<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "../stores/counter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Trash2, FolderPlus } from "lucide-vue-next";
import {
    Table,
    TableBody,
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
} from "@/components/ui/alert-dialog";
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from "@/components/ui/pagination";

const currentPage = ref(1);
const ncount = ref(0);
const per_page = 8;
const books = ref([]);
const store = useUserStore();
const customConfig = {
    Authorization: "Bearer " + store.token,
};
const cari = ref("");
const showDeleteDialog = ref(false);
const bookToDelete = ref(null);

const nomor = computed(() => {
    return currentPage.value === 1 ? 1 : (currentPage.value - 1) * per_page + 1;
});

const totalPages = computed(() => Math.ceil(ncount.value / per_page));

function docari() {
    currentPage.value = 1;
    refreshdata();
}

const onClickHandler = (page) => {
    currentPage.value = page;
    refreshdata();
};

function delete_dialog(isbn) {
    bookToDelete.value = isbn;
    showDeleteDialog.value = true;
}

function hapus() {
    if (!bookToDelete.value) return;

    axios({
        url: `http://localhost:8000/api/book/delete/${bookToDelete.value}`,
        method: "get",
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

function refreshdata() {
    const start_data =
        currentPage.value === 1 ? 0 : (currentPage.value - 1) * per_page;
    const thedata = {
        start: start_data,
        limit: per_page,
        cari: cari.value,
    };

    console.log(thedata);

    axios({
        url: "http://localhost:8000/api/book/cari",
        method: "post",
        headers: customConfig,
        data: thedata,
    })
        .then((response) => {
            console.log(response.data); // Only for development
            if (response.data.success === true) {
                books.value = response.data.data.buku;
                ncount.value = response.data.data.count;
            }
        })
        .catch((error) => {
            console.error("AJAX Error: ", error);
        });
}

onMounted(() => {
    refreshdata();
});

const visiblePages = computed(() => {
    const delta = 2;
    const range = [];
    for (
        let i = Math.max(2, currentPage.value - delta);
        i <= Math.min(totalPages.value - 1, currentPage.value + delta);
        i++
    ) {
        range.push(i);
    }

    if (currentPage.value - delta > 2) {
        range.unshift("...");
    }
    if (currentPage.value + delta < totalPages.value - 1) {
        range.push("...");
    }

    range.unshift(1);
    if (totalPages.value !== 1) {
        range.push(totalPages.value);
    }

    return range;
});
</script>

<template>
    <div class="container flex-col p-4 mx-auto">
        <div class="flex items-center mb-4 space-x-2">
            <Input
                v-model="cari"
                placeholder="Search books..."
                class="max-w-sm"
            />
            <Button @click="docari">Search</Button>
        </div>

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
                        <TableCell class="font-medium">{{
                            nomor + index
                        }}</TableCell>
                        <TableCell class="truncate">{{ item.isbn }}</TableCell>
                        <TableCell class="truncate">{{ item.judul }}</TableCell>
                        <TableCell class="truncate">{{
                            item.pengarang
                        }}</TableCell>
                        <TableCell>{{ item.tahun }}</TableCell>
                        <TableCell class="flex text-right">
                            <router-link
                                :to="{
                                    name: 'bukuview',
                                    params: { theisbn: item.isbn },
                                }"
                            >
                                <Button
                                    variant="outline"
                                    size="sm"
                                    class="mr-2"
                                >
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
                            delete the book and remove its data from our
                            servers.
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

        <Pagination
            v-if="totalPages > 1"
            class="flex items-center justify-center mt-4"
        >
            <PaginationFirst
                @click="onClickHandler(1)"
                :disabled="currentPage === 1"
                class="mx-2"
            />
            <PaginationPrev
                @click="onClickHandler(currentPage - 1)"
                :disabled="currentPage === 1"
                class="mx-2"
            />

            <PaginationList class="flex gap-4 mx-4">
                <template v-for="page in visiblePages" :key="page">
                    <PaginationListItem
                        v-if="page !== '...'"
                        :class="[
                            'border rounded px-3 py-2',
                            page === currentPage
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-accent hover:text-accent-foreground',
                        ]"
                        @click="onClickHandler(page)"
                    >
                        {{ page }}
                    </PaginationListItem>
                    <PaginationEllipsis v-else class="px-3 py-2" />
                </template>
            </PaginationList>

            <PaginationNext
                @click="onClickHandler(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="mx-2"
            />
            <PaginationLast
                @click="onClickHandler(totalPages)"
                :disabled="currentPage === totalPages"
                class="mx-2"
            />
        </Pagination>
    </div>
</template>
