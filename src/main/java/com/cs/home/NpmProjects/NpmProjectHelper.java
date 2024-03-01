package com.cs.home.NpmProjects;

import java.io.File;

public class NpmProjectHelper {

    public static String checkPath(NpmProject npmProject) {

        File dirPath = new File(npmProject.getPath());
        if (!dirPath.isDirectory()) {
            return npmProject.getPath() + "为空或不是文件夹";
        }

        return null;
    }


}
