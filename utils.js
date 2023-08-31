function share() {
    var copyText = document.getElementById("share-url");
    copyText.select();
    document.execCommand("Copy");
    if (isMobileDevice()) {
        let text = "Solve if you can: \n" + copyText.value;
        let shareData = { title: "Words", text: text };
        try {
            window.Android.share(text);
        } catch (err) { }
        try {
            navigator.share(shareData);
        } catch (err) { }
    } else {
    }
}

function isMobileDevice() {
    var check = false;
    (function (a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function cdl(s) {
    var result = [];
    let tmp = s.split(/(NJ|LJ|DŽ)/);
    tmp.forEach((a) => {
        if (a.match(/(NJ|LJ|DŽ)/)) {
            result.push(a);
        } else {
            result.push(...a.split(""));
        }
    });
    return result;
}


var g_patterns = [
    "45degreee_fabric",
    "60degree_gray",
    "absurdidad",
    "always_grey",
    "arab_tile",
    "arches",
    "argyle",
    "asfalt",
    "assault",
    "az_subtle",
    "back_pattern",
    "batthern",
    "bedge_grunge",
    "beige_paper",
    "bgnoise_lg",
    "billie_holiday",
    "black-Linen",
    "black_denim",
    "black_linen_v2",
    "black_mamba",
    "black_paper",
    "black_scales",
    "black_thread",
    "black_twill",
    "blackmamba",
    "blizzard",
    "blu_stripes",
    "bo_play_pattern",
    "bright_squares",
    "brillant",
    "broken_noise",
    "brushed_alu",
    "brushed_alu_dark",
    "burried",
    "candyhole",
    "carbon_fibre",
    "carbon_fibre_big",
    "carbon_fibre_v2",
    "cardboard",
    "cardboard_flat",
    "cartographer",
    "checkered_pattern",
    "chruch",
    "circles",
    "classy_fabric",
    "clean_textile",
    "climpek",
    "concrete_wall",
    "concrete_wall_2",
    "concrete_wall_3",
    "connect",
    "cork_1",
    "corrugation",
    "cream_dust",
    "crisp_paper_ruffles",
    "crissXcross",
    "cross_scratches",
    "crossed_stripes",
    "crosses",
    "cubes",
    "cutcube",
    "daimond_eyes",
    "dark_Tire",
    "dark_brick_wall",
    "dark_circles",
    "dark_dotted",
    "dark_geometric",
    "dark_leather",
    "dark_matter",
    "dark_mosaic",
    "dark_stripes",
    "dark_wall",
    "dark_wood",
    "darkdenim3",
    "darth_stripe",
    "denim",
    "diagmonds",
    "diagonal-noise",
    "diagonal_striped_brick",
    "diagonal_waves",
    "diamond_upholstery",
    "diamonds",
    "dirty_old_shirt",
    "double_lined",
    "dust",
    "dvsup",
    "egg_shell",
    "elastoplast",
    "elegant_grid",
    "embossed_paper",
    "escheresque",
    "exclusive_paper",
    "extra_clean_paper",
    "fabric_1",
    "fabric_plaid",
    "fake_brick",
    "fake_luxury",
    "fancy_deboss",
    "farmer",
    "felt",
    "first_aid_kit",
    "flowertrail",
    "foggy_birds",
    "foil",
    "frenchstucco",
    "furley_bg",
    "gold_scale",
    "gplaypattern",
    "gradient_squares",
    "graphy",
    "gray_sand",
    "green-fibers",
    "green_dust_scratch",
    "green_gobbler",
    "grey",
    "grey_sandbag",
    "greyfloral",
    "grid",
    "grid_noise",
    "gridme",
    "grilled",
    "groovepaper",
    "grunge_wall",
    "gun_metal",
    "handmadepaper",
    "hexabump",
    "hexellence",
    "hixs_pattern_evolution",
    "husk",
    "ice_age",
    "inflicted",
    "irongrip",
    "knitted-netting",
    "kuji",
    "large_leather",
    "leather_1",
    "lghtmesh",
    "light_alu",
    "light_checkered_tiles",
    "light_grey_floral_motif",
    "light_honeycomb",
    "light_noise_diagonal",
    "light_toast",
    "light_wool",
    "lightpaperfibers",
    "lil_fiber",
    "lined_paper",
    "linen",
    "little_pluses",
    "little_triangles",
    "littleknobs",
    "low_contrast_linen",
    "lyonnette",
    "merely_cubed",
    "micro_carbon",
    "mirrored_squares",
    "nami",
    "nasty_fabric",
    "natural_paper",
    "navy_blue",
    "nistri",
    "noise_lines",
    "noise_pattern_with_crosslines",
    "noisy",
    "noisy_grid",
    "noisy_net",
    "norwegian_rose",
    "office",
    "old_mathematics",
    "old_wall",
    "otis_redding",
    "outlets",
    "padded",
    "paper",
    "paper_1",
    "paper_2",
    "paper_3",
    "paven",
    "perforated_white_leather",
    "pineapplecut",
    "pinstripe",
    "pinstriped_suit",
    "plaid",
    "polaroid",
    "polonez_car",
    "polyester_lite",
    "pool_table",
    "project_papper",
    "psychedelic_pattern",
    "purty_wood",
    "px_by_Gre3g",
    "pyramid",
    "quilt",
    "random_grey_variations",
    "ravenna",
    "real_cf",
    "rebel",
    "redox_01",
    "redox_02",
    "reticular_tissue",
    "retina_dust",
    "retina_wood",
    "retro_intro",
    "ricepaper",
    "ricepaper2",
    "rip_jobs",
    "robots",
    "rockywall",
    "rough_diagonal",
    "roughcloth",
    "rubber_grip",
    "scribble_light",
    "shattered",
    "shinecaro",
    "shinedotted",
    "shl",
    "silver_scales",
    "skelatal_weave",
    "skewed_print",
    "skin_side_up",
    "small-crackle-bright",
    "small_tiles",
    "smooth_wall",
    "snow",
    "soft_circle_scales",
    "soft_kill",
    "soft_pad",
    "soft_wallpaper",
    "solid",
    "square_bg",
    "squares",
    "stacked_circles",
    "starring",
    "stitched_wool",
    "strange_bullseyes",
    "straws",
    "stressed_linen",
    "striped_lens",
    "struckaxiom",
    "stucco",
    "subtle_carbon",
    "subtle_dots",
    "subtle_freckles",
    "subtle_orange_emboss",
    "subtle_stripes",
    "subtle_surface",
    "subtle_zebra_3d",
    "subtlenet2",
    "swirl",
    "tactile_noise",
    "tapestry_pattern",
    "tasky_pattern",
    "tex2res1",
    "tex2res2",
    "tex2res3",
    "tex2res4",
    "tex2res5",
    "textured_stripes",
    "texturetastic_gray",
    "tileable_wood_texture",
    "tiny_grid",
    "triangles",
    "triangles_pattern",
    "txture",
    "type",
    "use_your_illusion",
    "vaio_hard_edge",
    "vertical_cloth",
    "vichy",
    "vintage_speckles",
    "wall4",
    "washi",
    "wavecut",
    "weave",
    "white_bed_sheet",
    "white_brick_wall",
    "white_carbon",
    "white_carbonfiber",
    "white_leather",
    "white_paperboard",
    "white_plaster",
    "white_sand",
    "white_texture",
    "white_tiles",
    "white_wall",
    "white_wave",
    "whitediamond",
    "whitey",
    "wide_rectangles",
    "wild_oliva",
    "wood_1",
    "wood_pattern",
    "worn_dots",
    "woven",
    "xv",
    "zigzag"
];
